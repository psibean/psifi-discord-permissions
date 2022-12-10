/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Request, Response } from "express";
import { nanoid } from 'nanoid'
import { createHash, randomBytes } from 'node:crypto';
import base64url from 'base64url';
import OAuth2Client from './OAuth2lient.js';
import type { GetAccessTokenReturn, OAuth2ClientConfigOptions } from './types';

export type PartiallyOptional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

export type OAuth2PLCEStateGenerator = (req?: Request) => string;

export type OAuth2PKCEError = {
  statusCode: number;
  error: string;
}

export interface OAuth2PKCEConfig {
  authorizationParams?: OAuth2PKCEAuthorizationParams;
  generateStateValue: OAuth2PLCEStateGenerator;
  oauthClientOptions: OAuth2ClientConfigOptions;
  refreshTokenUrl?: string;
  retrieveState: OAuth2PKCEStateRetriever;
  scopes: string[];
  scopeSeparator: string;
  storeState: OAuth2PKCEStateStorer;
}

export type OAuth2PKCEConfigOptions = PartiallyOptional<OAuth2PKCEConfig, "generateStateValue" | "scopeSeparator">

export type OAuth2PKCEAuthorize = (req: Request, res: Response) => void;
export type OAuth2PKCEConfirmAuthorization = (req: Request) => GetAccessTokenReturn;
export type OAuth2PKCERedirect = (url: string, res: Response) => void;

export type OAuth2PKCEState = {
    handle: ReturnType<OAuth2PLCEStateGenerator>,
    codeVerifier: string;
}

export type OAuth2PKCEStateStorer = (req: Request, state: OAuth2PKCEState) => void;
export type OAuth2PKCEStateRetriever = (req: Request) => Promise<OAuth2PKCEState | undefined> | OAuth2PKCEState | undefined;
export type OAuth2PKCEAuthorizationParams = (req?: Request) => Map<string, string>;

export default ({
  generateStateValue = () => nanoid(32),
  scopes,
  oauthClientOptions,
  retrieveState,
  scopeSeparator = ' ',
  storeState
}: OAuth2PKCEConfigOptions) => {
  const oauth2 = new OAuth2Client(oauthClientOptions);
  const scopeQueryParameter = scopes.join(scopeSeparator);

  const redirect: OAuth2PKCERedirect = (url, res) => {
    res.statusCode = 302;
    res.setHeader('Location', url);
    res.setHeader('Content-Length', '0');
    res.end();
  }

  const authorize: OAuth2PKCEAuthorize = (req, res) => {
    const verifier = base64url(randomBytes(32));
    const challenge = base64url(createHash('sha256').update(verifier).digest());
    const state = {
      handle: generateStateValue(),
      codeVerifier: verifier
    }
    const authorizationUrl = oauth2.getAuthorizeUrl({
      codeChallenge: challenge,
      state: state.handle,
      scope: scopeQueryParameter
    })
    storeState(req, state);

    redirect(authorizationUrl, res);
  }

  // Promise<AuythorizationErrorResponse | AccessTokenResponsePayload | undefined>
  const confirmAuthorization: OAuth2PKCEConfirmAuthorization = async (req) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {
      code: receivedCode = undefined,
      state: receivedState = undefined
    } = req.query;

    const internalState = await retrieveState(req);

    if (!internalState) {
      throw {
        status: 400,
        error: "Invalid authorization."
      }
    }

    const {
      codeVerifier,
      handle: expectedState
    } = internalState;

    if (typeof receivedState !== 'string'
      || typeof receivedCode !== 'string'
      || receivedState !== expectedState) {
      throw {
        status: 400,
        error: 'Invalid request parameters.'
      };
    }

    return oauth2.getAccessToken(receivedCode, { codeVerifier }).then(data => {
      if (data.error) {
        throw {
          status: 400,
          ...data
        }
      }
      return data;
    });
  }

  return {
    authorize,
    confirmAuthorization,
    oauth2
  }
}
