import { TinaNodeBackend, LocalBackendAuthProvider } from '@tinacms/datalayer';
import type { BackendAuthProvider } from '@tinacms/datalayer';
import databaseClient from '../../../tina/__generated__/databaseClient';
import type { IncomingMessage, ServerResponse } from 'http';
import { auth } from '../../../auth';

// Local mode controlled by TINA_PUBLIC_IS_LOCAL environment variable
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

/**
 * Custom NextAuth Backend Auth Provider for TinaCMS
 * Validates NextAuth sessions and restricts access to @neo14.com domain
 */
const NextAuthBackendAuthProvider = (): BackendAuthProvider => {
  return {
    isAuthorized: async (req: IncomingMessage, res: ServerResponse) => {
      try {
        // Get NextAuth session
        const session = await auth();
        
        // Check if session exists and email is from @neo14.com domain
        if (session?.user?.email?.endsWith('@neo14.com')) {
          return {
            isAuthorized: true,
          };
        }
        
        return {
          isAuthorized: false,
          errorMessage: 'Unauthorized: Access restricted to @neo14.com domain',
          errorCode: 401,
        };
      } catch (error) {
        console.error('NextAuth authorization error:', error);
        return {
          isAuthorized: false,
          errorMessage: 'Authentication error',
          errorCode: 500,
        };
      }
    },
  };
};

const handler = TinaNodeBackend({
  authProvider: isLocal
    ? LocalBackendAuthProvider()
    : NextAuthBackendAuthProvider(),
  databaseClient,
});

export default (req: any, res: any) => {
  return handler(req, res);
};

