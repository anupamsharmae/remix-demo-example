import { PrismaClient } from '@prisma/client';

declare global {
   // eslint-disable-next-line no-var
   var __db: PrismaClient | undefined;
}

/**
 * @type PrismaClient
 */
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
   prisma = new PrismaClient();
   prisma.$connect();
} else {
   if (!global.__db) {
      global.__db = new PrismaClient();
      global.__db.$connect();
   }
   prisma = global.__db;
}
export { prisma };