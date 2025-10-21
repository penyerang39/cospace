import type { Adapter, AdapterUser, AdapterAccount, AdapterSession, VerificationToken } from 'next-auth/adapters';
import { Redis } from '@upstash/redis';

export function UpstashRedisAdapter(): Adapter {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });

  return {
    async createVerificationToken(verificationToken: VerificationToken): Promise<VerificationToken> {
      const key = `verification-token:${verificationToken.identifier}:${verificationToken.token}`;
      await redis.set(key, JSON.stringify(verificationToken), {
        ex: 24 * 60 * 60, // 24 hours
      });
      return verificationToken;
    },

    async useVerificationToken({ identifier, token }: { identifier: string; token: string }): Promise<VerificationToken | null> {
      const key = `verification-token:${identifier}:${token}`;
      const data = await redis.get(key);
      
      if (!data) return null;
      
      await redis.del(key);
      
      return typeof data === 'string' ? JSON.parse(data) : data as VerificationToken;
    },

    async getUserByEmail(email: string): Promise<AdapterUser | null> {
      const key = `user:email:${email}`;
      const userId = await redis.get(key);
      
      if (!userId) return null;
      
      const user = await redis.get(`user:${userId}`);
      return typeof user === 'string' ? JSON.parse(user) : user as AdapterUser;
    },

    async createUser(user: Omit<AdapterUser, 'id'>): Promise<AdapterUser> {
      const id = crypto.randomUUID();
      const newUser = { ...user, id, emailVerified: user.emailVerified ?? null };
      
      await redis.set(`user:${id}`, JSON.stringify(newUser));
      if (user.email) {
        await redis.set(`user:email:${user.email}`, id);
      }
      
      return newUser;
    },

    async getUser(id: string): Promise<AdapterUser | null> {
      const user = await redis.get(`user:${id}`);
      return typeof user === 'string' ? JSON.parse(user) : user as AdapterUser;
    },

    async getUserByAccount({ providerAccountId, provider }: { providerAccountId: string; provider: string }): Promise<AdapterUser | null> {
      const key = `account:${provider}:${providerAccountId}`;
      const userId = await redis.get(key);
      
      if (!userId) return null;
      
      const user = await redis.get(`user:${userId}`);
      return typeof user === 'string' ? JSON.parse(user) : user as AdapterUser;
    },

    async updateUser(user: Partial<AdapterUser> & Pick<AdapterUser, 'id'>): Promise<AdapterUser> {
      const existingUser = await redis.get(`user:${user.id}`);
      const updatedUser = { 
        ...(typeof existingUser === 'string' ? JSON.parse(existingUser) : existingUser),
        ...user 
      };
      await redis.set(`user:${user.id}`, JSON.stringify(updatedUser));
      return updatedUser as AdapterUser;
    },

    async linkAccount(account: AdapterAccount): Promise<AdapterAccount> {
      const key = `account:${account.provider}:${account.providerAccountId}`;
      await redis.set(key, account.userId);
      return account;
    },

    async createSession(session: AdapterSession): Promise<AdapterSession> {
      await redis.set(`session:${session.sessionToken}`, JSON.stringify(session), {
        ex: 30 * 24 * 60 * 60, // 30 days
      });
      return session;
    },

    async getSessionAndUser(sessionToken: string): Promise<{ session: AdapterSession; user: AdapterUser } | null> {
      const session = await redis.get(`session:${sessionToken}`);
      
      if (!session) return null;
      
      const parsedSession = typeof session === 'string' ? JSON.parse(session) : session;
      const user = await redis.get(`user:${parsedSession.userId}`);
      
      if (!user) return null;
      
      return {
        session: parsedSession as AdapterSession,
        user: typeof user === 'string' ? JSON.parse(user) : user as AdapterUser,
      };
    },

    async updateSession(session: Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>): Promise<AdapterSession> {
      const existingSession = await redis.get(`session:${session.sessionToken}`);
      const updatedSession = {
        ...(typeof existingSession === 'string' ? JSON.parse(existingSession) : existingSession),
        ...session
      };
      await redis.set(`session:${session.sessionToken}`, JSON.stringify(updatedSession), {
        ex: 30 * 24 * 60 * 60, // 30 days
      });
      return updatedSession as AdapterSession;
    },

    async deleteSession(sessionToken: string): Promise<void> {
      await redis.del(`session:${sessionToken}`);
    },
  };
}

