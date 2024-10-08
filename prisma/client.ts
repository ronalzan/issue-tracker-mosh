import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  /* remarked the log. This param is to enable the log for query from prisma
  return new PrismaClient({
    log: ['query']
  }) */
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma