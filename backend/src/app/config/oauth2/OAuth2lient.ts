import type {
  AccessTokenResponse,
  AccessTokenResponsePayload,
  OAuth2ErrorResponse,
  GetAccessTokenOptions,
  GetAuthorizeUrlOptions,
  OAuth2ClientConfigOptions,
  OAuth2GetOptions,
  ProtectedReuqestOptions,
  RevokeTokenHint,
} from "./types";

export default class OAuth2Client {
  private _accessTokenUrl: string;
  private _authorizeUrl: string;
  private _clientId: string;
  private _clientSecret: string;
  private _revokeTokenUrl: string;

  public accessTokenName: string;
  public authMethod: string;
  public baseUrl: string;
  public redirectUrl?: string;

  public constructor(options: OAuth2ClientConfigOptions) {
    this._accessTokenUrl = options.accessTokenUrl ?? "/oauth2/token";
    this._authorizeUrl = options.authorizeUrl ?? "/oauth2/authorize";
    this._clientId = options.clientId;
    this._clientSecret = options.clientSecret;
    this._revokeTokenUrl =
      options.revokeTokenUrl ?? `${this._accessTokenUrl}/revoke`;
    this.accessTokenName = options.accessTokenName ?? "access_token";
    this.authMethod = options.authMethod ?? "Bearer";
    this.baseUrl = options.baseUrl;
    this.redirectUrl = options.redirectUrl;
  }

  public getAccessTokenUrl() {
    return `${this.baseUrl}${this._accessTokenUrl}`;
  }

  public getAuthorizeUrl(
    {
      codeChallenge,
      redirectUrl,
      scope,
      state,
    }: GetAuthorizeUrlOptions
  ) {
    const authorizeUrl = new URL(this.buildUrl(this._authorizeUrl));
    authorizeUrl.searchParams.set('code_challenge', codeChallenge);
    if (scope) {
      authorizeUrl.searchParams.set('scope', scope);
    }
    authorizeUrl.searchParams.set('state', state);

    if (redirectUrl || this.redirectUrl) {
      authorizeUrl.searchParams.set('redirect_uri', (redirectUrl ?? this.redirectUrl) as string);
    }
    
    authorizeUrl.searchParams.set("client_id", this._clientId);
    authorizeUrl.searchParams.set("response_type", "code");
    if (this.redirectUrl && !authorizeUrl.searchParams.has("redirect_uri")) {
      authorizeUrl.searchParams.set("redirect_uri", this.redirectUrl);
    }
    return authorizeUrl.toString();
  }

  public getRevokeTokenUrl() {
    return this.buildUrl(this._revokeTokenUrl);
  }

  public buildResourceOwnerAuthorization(accessToken: string) {
    return `${this.authMethod} ${accessToken}`;
  }

  public buildClientAuthorization() {
    const encodedCredentials = Buffer.from(
      `${this._clientId}:${this._clientSecret}`
    ).toString("base64");
    return `Basic ${encodedCredentials}`;
  }

  /**
   * Requests an access token.
   * @param code Either the code parameter, or a refresh token
   * @param requestOptions The options passed to the fetch call
   * @returns
   */
  public getAccessToken(
    code: string,
    { 
      useAuthorizationHeader = false,
      redirectUrl,
      codeVerifier
    }: GetAccessTokenOptions
  ) {
    const body = new URLSearchParams();
    const headers = new Headers();

    headers.set("Content-Type", "application/x-www-form-urlencoded");
    if (useAuthorizationHeader) {
      headers.set("Authorization", this.buildClientAuthorization());
    } else {
      body.set('client_id', this._clientId);
      body.set('client_secret', this._clientSecret);
    }
    body.set('grant_type', 'authorization_code');
    body.set('code', code);
    body.set('code_verifier', codeVerifier);

    if (redirectUrl || this.redirectUrl) {
      body.set("redirect_uri", (redirectUrl ?? this.redirectUrl) as string);
    }

    const testFormData = new FormData();
    testFormData.set("test", "thing");
    testFormData.set("hello", "world");

    return fetch(this.getAccessTokenUrl(), {
      headers,
      body: body,
      method: 'POST'
    })
      .then((response) =>
        response.json().then((data: AccessTokenResponse) => {
          if (data.error) {
            throw data;
          }
          return data as AccessTokenResponsePayload
        })
      )
  }

  public revokeToken(tokenToRevoke: string, tokenHint?: RevokeTokenHint) {
    const body = new FormData();
    const headers = new Headers();

    body.set("token", tokenToRevoke);
    headers.set("Content-Type", "application/x-www-form-urlencoded");
    if (tokenHint) {
      body.set("token_type_hint", tokenHint);
    }
    headers.set("Authorization", this.buildClientAuthorization());
    return fetch(this.getRevokeTokenUrl(), {
      body,
      headers,
      method: 'POST'
    });
  }

  /**
   * Makes an authenticated GET request to the specified url path using the provided access token
   * @param url The URL path (it is concatenated to the base url)
   * @param accessToken The access token to make the request with
   * @param requestOptions The options to pass to the fetch call
   * @returns
   */
  public getProtectedResource<T>(
    url: string,
    accessToken: string,
    {
      useAuthorizationHeader = true,
      headers = {},
      ...remainingOptions
    }: OAuth2GetOptions = {}
  ) {
    const parsedUrl = new URL(`${this.buildUrl(url)}`);
    if (useAuthorizationHeader) {
      headers["Authorization"] =
        this.buildResourceOwnerAuthorization(accessToken);
    } else {
      parsedUrl.searchParams.set(this.accessTokenName, accessToken);
    }
    return fetch(parsedUrl.toString(), {
      ...remainingOptions,
      headers,
    }).then(async response => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await response.json() as T | OAuth2ErrorResponse;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if ("error" in data) {
        throw data;
      }

      return data;
    });
  }

  public postProtectedResource(
    url: string,
    accessToken: string,
    {
      useAuthorizationHeader = true,
      headers = {},
      ...remainingOptions
    }: ProtectedReuqestOptions
  ) {
    const parsedUrl = new URL(`${this.buildUrl(url)}`);

    if (useAuthorizationHeader) {
      headers["Authorization"] =
        this.buildResourceOwnerAuthorization(accessToken);
    }

    return fetch(parsedUrl, {
      ...remainingOptions,
      headers,
      method: "POST",
    });
  }

  public buildUrl(path: string) {
    return `${this.baseUrl}${path}`;
  }
}
