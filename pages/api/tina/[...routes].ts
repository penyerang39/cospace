import { TinaNodeBackend, LocalBackendAuthProvider } from '@tinacms/datalayer';
import databaseClient from '../../../tina/__generated__/databaseClient';

const handler = TinaNodeBackend({
  authProvider: LocalBackendAuthProvider(),
  databaseClient,
});

const tinaHandler = (req: any, res: any) => {
  // Modify request
  return handler(req, res);
};

export default tinaHandler;

