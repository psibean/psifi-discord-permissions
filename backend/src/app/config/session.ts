import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../../database/db.js';
import { IS_PRODUCTION, SESSION_MAX_AGE, SESSION_SECRET } from '../../utils/constants.js';

const sessionCOnfig = session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: IS_PRODUCTION, sameSite: 'lax', signed: true, maxAge: SESSION_MAX_AGE },
  genid: () => uuidv4(),
  store: new PrismaSessionStore(
    prisma,
    {
      dbRecordIdIsSessionId: true
    })
});

export default sessionCOnfig;