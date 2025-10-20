import { TinaNodeBackend, LocalBackendAuthProvider } from '@tinacms/datalayer';
import { AuthJsBackendAuthProvider, TinaAuthJSOptions } from 'tinacms-authjs';
import databaseClient from '../../../tina/__generated__/client';

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

const handler = TinaNodeBackend({
  authentication: isLocal
    ? // Use local auth in development (no login required)
      LocalBackendAuthProvider()
    : // Use NextAuth in production (magic links required)
      AuthJsBackendAuthProvider({
        authOptions: TinaAuthJSOptions({
          databaseClient: databaseClient,
          secret: process.env.NEXTAUTH_SECRET!,
        }),
      }),
  databaseClient,
});

export default (req: any, res: any) => {
  // Modify request
  return handler(req, res);
};

