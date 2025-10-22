import type { AuthProvider } from 'tinacms';

/**
 * Custom TinaCMS Auth Provider that integrates with NextAuth v5
 * Handles authentication via NextAuth session for TinaCMS admin interface
 */
export class NextAuthProvider implements AuthProvider {
  async authenticate(): Promise<void> {
    // Redirect to NextAuth login page
    window.location.href = '/admin/login';
  }

  async getToken(): Promise<string | null> {
    // Get NextAuth session token from cookie
    // NextAuth v5 stores the session in a cookie named 'authjs.session-token' or 'next-auth.session-token'
    const cookies = document.cookie.split(';');
    const sessionCookie = cookies.find(cookie => 
      cookie.trim().startsWith('authjs.session-token=') || 
      cookie.trim().startsWith('next-auth.session-token=') ||
      cookie.trim().startsWith('__Secure-authjs.session-token=')
    );
    
    if (sessionCookie) {
      const token = sessionCookie.split('=')[1];
      return token;
    }
    
    return null;
  }

  async getUser(): Promise<{ name?: string; email?: string } | null> {
    try {
      // Fetch session from NextAuth API
      const response = await fetch('/api/auth/session');
      if (response.ok) {
        const session = await response.json();
        if (session?.user) {
          return {
            name: session.user.name || session.user.email,
            email: session.user.email,
          };
        }
      }
    } catch (error) {
      console.error('Failed to fetch user session:', error);
    }
    
    return null;
  }

  async logout(): Promise<void> {
    // Use NextAuth signOut
    window.location.href = '/api/auth/signout';
  }

  // Additional methods required by TinaCMS AuthProvider interface
  async authorize(context?: unknown): Promise<unknown> {
    // Authorization is handled by NextAuth
    return this.getUser();
  }

  async fetchWithToken(input: RequestInfo, init?: RequestInit): Promise<Response> {
    // Fetch with NextAuth session cookie (automatically included)
    return fetch(input, init);
  }

  async isAuthorized(context?: unknown): Promise<boolean> {
    const user = await this.getUser();
    return user !== null;
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return token !== null;
  }
}

