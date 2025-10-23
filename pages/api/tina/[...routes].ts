// TinaCMS Disabled - Fallback API
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(503).json({ 
    error: 'TinaCMS is temporarily disabled',
    message: 'Use toggle script to re-enable'
  });
}