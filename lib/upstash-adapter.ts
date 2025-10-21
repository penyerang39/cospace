import type { Adapter } from 'next-auth/adapters';
import { Redis } from '@upstash/redis';

export function UpstashRedisAdapter(): Adapter {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });

  return {
    async createVerificationToken(verificationToken) {
      const key = `verification-token:${verificationToken.identifier}:${verificationToken.token}`;
      await redis.set(key, JSON.stringify(verificationToken), {
        ex: 24 * 60 * 60, // 24 hours
      });
      return verificationToken;
    },

    async useVerificationToken({ identifier, token }) {
      const key = `verification-token:${identifier}:${token}`;
      const data = await redis.get(key);
      
      if (!data) return null;
      
      await redis.del(key);
      
      return typeof data === 'string' ? JSON.parse(data) : data;
    },

    async getUserByEmail(email) {
      const key = `user:email:${email}`;
      const userId = await redis.get(key);
      
      if (!userId) return null;
      
      const user = await redis.get(`user:${userId}`);
      return typeof user === 'string' ? JSON.parse(user) : user;
    },

    async createUser(user) {
      const id = crypto.randomUUID();
      const newUser = { ...user, id };
      
      await redis.set(`user:${id}`, JSON.stringify(newUser));
      await redis.set(`user:email:${user.email}`, id);
      
      return newUser;
    },

    async getUser(id) {
      const user = await redis.get(`user:${id}`);
      return typeof user === 'string' ? JSON.parse(user) : user;
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const key = `account:${provider}:${providerAccountId}`;
      const userId = await redis.get(key);
      
      if (!userId) return null;
      
      const user = await redis.get(`user:${userId}`);
      return typeof user === 'string' ? JSON.parse(user) : user;
    },

    async updateUser(user) {
      await redis.set(`user:${user.id}`, JSON.stringify(user));
      return user;
    },

    async linkAccount(account) {
      const key = `account:${account.provider}:${account.providerAccountId}`;
      await redis.set(key, account.userId);
      return account;
    },

    async createSession(session) {
      await redis.set(`session:${session.sessionToken}`, JSON.stringify(session), {
        ex: 30 * 24 * 60 * 60, // 30 days
      });
      return session;
    },

    async getSessionAndUser(sessionToken) {
      const session = await redis.get(`session:${sessionToken}`);
      
      if (!session) return null;
      
      const parsedSession = typeof session === 'string' ? JSON.parse(session) : session;
      const user = await redis.get(`user:${parsedSession.userId}`);
      
      if (!user) return null;
      
      return {
        session: parsedSession,
        user: typeof user === 'string' ? JSON.parse(user) : user,
      };
    },

    async updateSession(session) {
      await redis.set(`session:${session.sessionToken}`, JSON.stringify(session), {
        ex: 30 * 24 * 60 * 60, // 30 days
      });
      return session;
    },

    async deleteSession(sessionToken) {
      await redis.del(`session:${sessionToken}`);
    },
  };
}

