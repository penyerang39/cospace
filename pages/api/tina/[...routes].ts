import { TinaNodeBackend } from '@tinacms/datalayer';
import databaseClient from '../../../tina/__generated__/databaseClient';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import type { NextApiRequest, NextApiResponse } from 'next';

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

const handler = TinaNodeBackend({
  authProvider: isLocal ? undefined : {
    isAuthorized: async (req: NextApiRequest, res: NextApiResponse) => {
      const session = await getServerSession(req, res, authOptions);
      
      if (!session || !session.user?.email) {
        return {
          isAuthorized: false,
        };
      }

      // Only allow @neo14.com emails
      if (!session.user.email.endsWith('@neo14.com')) {
        return {
          isAuthorized: false,
        };
      }

      return {
        isAuthorized: true,
      };
    },
  },
  databaseClient,
});

export default handler;

