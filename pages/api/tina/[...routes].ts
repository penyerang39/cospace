import { TinaNodeBackend, LocalBackendAuthProvider } from '@tinacms/datalayer';
import databaseClient from '../../../tina/__generated__/client';
import database from '../../../tina/database';

const handler = TinaNodeBackend({
  authentication: LocalBackendAuthProvider(),
  databaseClient,
  database,
});

const tinaHandler = (req: Request, res: Response) => {
  // Modify request
  return handler(req, res);
};

export default tinaHandler;

