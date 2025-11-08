import { NextRequest, NextResponse } from 'next/server';

const UMAMI_BASE_URL = process.env.UMAMI_BASE_URL;
const UMAMI_COLLECT_PATH = process.env.UMAMI_COLLECT_PATH || '/api/send';
const ALLOWED_ORIGINS = process.env.NEXT_PUBLIC_SITE_URL 
  ? [process.env.NEXT_PUBLIC_SITE_URL] 
  : [];

async function rateLimit(identifier: string): Promise<boolean> {
  // Optional: Implement Upstash rate limiting
  if (!process.env.UPSTASH_REDIS_REST_URL) {
    return true; // No rate limiting if Redis not configured
  }

  try {
    const { Redis } = await import('@upstash/redis');
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });

    const key = `umami_rate_limit:${identifier}`;
    const limit = 100; // requests per window
    const window = 60; // seconds

    const current = await redis.incr(key);
    if (current === 1) {
      await redis.expire(key, window);
    }

    return current <= limit;
  } catch (error) {
    console.error('Rate limit error:', error);
    return true; // Allow on error
  }
}

export async function POST(request: NextRequest) {
  if (!UMAMI_BASE_URL) {
    return NextResponse.json(
      { error: 'Umami not configured' },
      { status: 500 }
    );
  }

  // CORS check
  const origin = request.headers.get('origin');
  if (origin && ALLOWED_ORIGINS.length > 0 && !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json(
      { error: 'Origin not allowed' },
      { status: 403 }
    );
  }

  // Rate limiting
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  const allowed = await rateLimit(ip);
  
  if (!allowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    
    // Forward to Umami
    const umamiUrl = `${UMAMI_BASE_URL}${UMAMI_COLLECT_PATH}`;
    const response = await fetch(umamiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': request.headers.get('user-agent') || '',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Umami responded with ${response.status}`);
    }

    const data = await response.json();
    
    const res = NextResponse.json(data);
    
    // Add CORS headers
    if (origin) {
      res.headers.set('Access-Control-Allow-Origin', origin);
      res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    }
    
    return res;
  } catch (error) {
    console.error('Umami proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to forward request' },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  const res = new NextResponse(null, { status: 204 });
  
  if (origin) {
    res.headers.set('Access-Control-Allow-Origin', origin);
    res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    res.headers.set('Access-Control-Max-Age', '86400');
  }
  
  return res;
}


