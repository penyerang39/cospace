import { auth } from '@/app/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

const UMAMI_BASE_URL = process.env.UMAMI_BASE_URL;

async function proxyRequest(
  request: NextRequest,
  path: string,
  method: string
): Promise<NextResponse> {
  if (!UMAMI_BASE_URL) {
    return NextResponse.json(
      { error: 'Umami not configured' },
      { status: 500 }
    );
  }

  try {
    const url = new URL(request.url);
    const targetUrl = `${UMAMI_BASE_URL}${path}${url.search}`;

    // Prepare headers
    const headers: HeadersInit = {};
    request.headers.forEach((value, key) => {
      // Skip host and connection headers
      if (!['host', 'connection', 'x-forwarded-for', 'x-real-ip'].includes(key.toLowerCase())) {
        headers[key] = value;
      }
    });

    // Prepare request options
    const options: RequestInit = {
      method,
      headers,
      redirect: 'manual',
    };

    // Add body for non-GET requests
    if (method !== 'GET' && method !== 'HEAD') {
      const contentType = request.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        options.body = JSON.stringify(await request.json());
      } else if (contentType?.includes('application/x-www-form-urlencoded') || 
                 contentType?.includes('multipart/form-data')) {
        options.body = await request.arrayBuffer();
      }
    }

    const response = await fetch(targetUrl, options);

    // Handle redirects
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      if (location) {
        // Rewrite redirects to go through our proxy
        const redirectUrl = new URL(location, UMAMI_BASE_URL);
        const proxyLocation = `/admin/dashboard/analytics${redirectUrl.pathname}${redirectUrl.search}`;
        return NextResponse.redirect(new URL(proxyLocation, request.url));
      }
    }

    // Get response body
    const contentType = response.headers.get('content-type');
    let body: any;
    
    if (contentType?.includes('application/json')) {
      body = await response.json();
    } else if (contentType?.includes('text/html')) {
      let html = await response.text();
      // Rewrite URLs in HTML to go through our proxy
      html = html.replace(
        /(href|src|action)=["']\/([^"']*)["']/g,
        '$1="/admin/dashboard/analytics/$2"'
      );
      body = html;
    } else {
      body = await response.arrayBuffer();
    }

    // Create response with same status
    const nextResponse = new NextResponse(body, {
      status: response.status,
      statusText: response.statusText,
    });

    // Copy relevant headers
    response.headers.forEach((value, key) => {
      // Rewrite set-cookie paths
      if (key.toLowerCase() === 'set-cookie') {
        const rewrittenCookie = value.replace(
          /Path=\/([^;]*)/g,
          'Path=/admin/dashboard/analytics/$1'
        );
        nextResponse.headers.append(key, rewrittenCookie);
      } else if (!['content-encoding', 'transfer-encoding', 'connection'].includes(key.toLowerCase())) {
        nextResponse.headers.set(key, value);
      }
    });

    return nextResponse;
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { path?: string[] } }
) {
  const session = await auth();
  
  if (!session) {
    return NextResponse.redirect(new URL('/admin/signin', request.url));
  }

  const path = params.path ? `/${params.path.join('/')}` : '/';
  return proxyRequest(request, path, 'GET');
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path?: string[] } }
) {
  const session = await auth();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const path = params.path ? `/${params.path.join('/')}` : '/';
  return proxyRequest(request, path, 'POST');
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path?: string[] } }
) {
  const session = await auth();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const path = params.path ? `/${params.path.join('/')}` : '/';
  return proxyRequest(request, path, 'PUT');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path?: string[] } }
) {
  const session = await auth();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const path = params.path ? `/${params.path.join('/')}` : '/';
  return proxyRequest(request, path, 'DELETE');
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { path?: string[] } }
) {
  const session = await auth();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const path = params.path ? `/${params.path.join('/')}` : '/';
  return proxyRequest(request, path, 'PATCH');
}

