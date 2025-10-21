import { TinaNodeBackend, LocalBackendAuthProvider } from '@tinacms/datalayer';
import type { BackendAuthProvider } from '@tinacms/datalayer';
import databaseClient from '../../../tina/__generated__/databaseClient';
import type { IncomingMessage, ServerResponse } from 'http';

const isLocal = true; // Force local mode for self-hosted setup

// Simple token-based auth for production
const SimpleBackendAuth = (): BackendAuthProvider => {
  return {
    isAuthorized: async (req: IncomingMessage, res: ServerResponse) => {
      const authHeader = req.headers.authorization;
      const token = authHeader?.replace('Bearer ', '');
      
      const validToken = process.env.TINA_TOKEN;
      
      if (!validToken) {
        console.error('TINA_TOKEN environment variable not set!');
        return {
          isAuthorized: false,
          errorMessage: 'Server configuration error',
          errorCode: 500,
        };
      }
      
      if (token === validToken) {
        return { isAuthorized: true };
      }
      
      return {
        isAuthorized: false,
        errorMessage: 'Invalid token',
        errorCode: 401,
      };
    },
  };
};

const handler = TinaNodeBackend({
  authProvider: isLocal ? LocalBackendAuthProvider() : SimpleBackendAuth(),
  databaseClient,
});

export default (req: any, res: any) => {
  return handler(req, res);
};

