import * as pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.PSD_DATABASE_URL
    }
  }
});

export default prisma;