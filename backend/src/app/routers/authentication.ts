import { Router } from 'express';
import AuthenticationController from '..//controllers/AuthenticationController.js';

const authenticationController = new AuthenticationController();

const authenticationRouter = Router({
  caseSensitive: false
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
authenticationRouter.get('/discord/login', (req, res) => authenticationController.authorize(req, res));
authenticationRouter.post('/discord/login', (req, res) => authenticationController.login(req, res));
authenticationRouter.post('/logout', (req, res) => authenticationController.logout(req, res));

export default authenticationRouter;

// meter) req: Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>

// Argument of type 'Request<{}, any, any, ParsedQs, Record<string, any>>' is not assignable to parameter of type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.ts(2345)
