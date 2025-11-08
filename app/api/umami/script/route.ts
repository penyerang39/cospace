import { NextRequest, NextResponse } from 'next/server';

const UMAMI_BASE_URL = process.env.UMAMI_BASE_URL;

export async function GET(request: NextRequest) {
  if (!UMAMI_BASE_URL) {
    return new NextResponse('// Umami not configured', {
      status: 200,
      headers: { 'Content-Type': 'application/javascript' },
    });
  }

  try {
    // Fetch the Umami script from the Umami instance
    const scriptUrl = `${UMAMI_BASE_URL}/script.js`;
    const response = await fetch(scriptUrl, {
      headers: {
        'User-Agent': request.headers.get('user-agent') || '',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch script: ${response.status}`);
    }

    const script = await response.text();

    return new NextResponse(script, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Failed to fetch Umami script:', error);
    return new NextResponse('// Failed to load analytics', {
      status: 200,
      headers: { 'Content-Type': 'application/javascript' },
    });
  }
}


