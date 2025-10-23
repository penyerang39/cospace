// TinaCMS Disabled - Fallback API
export default function handler(req, res) {
  res.status(503).json({ 
    error: 'TinaCMS is temporarily disabled',
    message: 'Use toggle script to re-enable'
  });
}