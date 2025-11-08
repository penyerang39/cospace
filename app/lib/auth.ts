import NextAuth from 'next-auth';
import Resend from 'next-auth/providers/resend';
import type { NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

// Singleton pattern for Prisma Client
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: '/admin/signin',
    verifyRequest: '/admin/verify',
    error: '/admin/error',
  },
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.AUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);


