import { Request, Response, Router } from 'express';
import authenticated from '../middleware/authenticated.js';
import PublicController from '../controllers/PublicController.js';
import authenticationRouter from './authentication.js';
import { doubleCsrfProtection } from '../config/csrf.js';
import discordRouter from './discord.js';

const publicController = new PublicController();

const rootRouter = Router({
  caseSensitive: false,
});

rootRouter.get('/csrftoken', (req, res) => publicController.getCsrfToken(req, res));
// rootRouter.get(/.*/, (req, res) => publicController.getRoot(req, res))

rootRouter.use(doubleCsrfProtection)  
rootRouter.use('/auth', authenticationRouter);

rootRouter.use(authenticated);

rootRouter.use('/users/@me', (req: Request, res: Response) => {
  res.status(200).json(req.user?.data() ?? {});
})

rootRouter.use('/discord', discordRouter);

export default rootRouter;