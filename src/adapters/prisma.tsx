import { PrismaClient } from '@prisma/client';


function createPrismaClient(): PrismaClient {
    const prisma = new PrismaClient();
    return prisma;
  }



export { createPrismaClient };