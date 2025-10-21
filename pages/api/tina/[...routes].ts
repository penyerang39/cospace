import { TinaNodeBackend, LocalBackendAuthProvider } from '@tinacms/datalayer';
import databaseClient from '../../../tina/__generated__/databaseClient';

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

const handler = TinaNodeBackend({
  authProvider: LocalBackendAuthProvider(),
  databaseClient,
});

export default (req: any, res: any) => {
  return handler(req, res);
};

