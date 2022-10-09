export type PartiallyOptional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

export type OAuth2ClientConfigOptions = PartiallyOptional<
  OAuth2lientConfig,
  | "accessTokenName"
  | "accessTokenUrl"
  | "authMethod"
  | "revokeTokenUrl"
>;
export type OAuth2Headers = Record<string, string>;
export type RevokeTokenHint = "refresh_token" | "access_token";
export type OAuth2BaseReuqestOptions = Omit<
  RequestInit,
  "method" | "headers"
> & { headers?: OAuth2Headers };
export type ProtectedReuqestOptions = OAuth2BaseReuqestOptions & {
  useAuthorizationHeader: boolean;
};
export type OAuth2GetOptions = Partial<Omit<ProtectedReuqestOptions, "body">>;

export interface OAuth2lientConfig {
  accessTokenName: string;
  accessTokenUrl: string;
  authMethod: string;
  authorizeUrl: string;
  baseUrl: string;
  clientId: string;
  clientSecret: string;
  redirectUrl?: string;
  revokeTokenUrl: string;
}

/**
 * Authorization request query parameters as defined in RFC6749: Section 4.1.1
 * https://www.rfc-editor.org/rfc/rfc6749#section-4.1.1
 */
export interface AuthorizationRequestParameters {
  response_type: string;
  client_id: string;
  code_challenge: string;
  redirect_uri?: string;
  scope?: string;
  state: string;
}

export type GetAuthorizeUrlOptions = {
  codeChallenge: string;
  scope?: string;
  state: string;
  redirectUrl?: string;
}

export type AuthorizationErrorCode =
  | "invalid_request"
  | "invalid_client"
  | "invalid_grant"
  | "unauthorized_client"
  | "unsupported_grant_type"
  | "invalid_scope";

export interface OAuth2ErrorResponse {
  error: AuthorizationErrorCode;
  error_description?: string;
  error_uri?: string;
}

export interface AccessTokenRequestPayload {
  grant_type: "authorization_code";
  code: string;
  redirect_uri: string;
  client_id?: string;
  client_secret?: string;
  code_verifier: string;
}

export type GetAccessTokenOptions = {
  codeVerifier: string,
  redirectUrl?: string;
  useAuthorizationHeader?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface AccessTokenResponsePayload extends Record<string, any> {
  access_token: string;
  token_type: string;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;
}

export type AccessTokenResponse =
  | OAuth2ErrorResponse
  | AccessTokenResponsePayload;

export type GetAccessTokenReturn = Promise<AccessTokenResponsePayload>;