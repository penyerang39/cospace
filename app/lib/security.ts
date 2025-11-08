/**
 * Security utilities for protecting admin routes and Umami instance
 */

/**
 * Validates if the request is from an allowed origin
 */
export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  
  if (siteUrl) {
    allowedOrigins.push(siteUrl);
  }
  
  // Allow localhost in development
  if (process.env.NODE_ENV === 'development') {
    allowedOrigins.push('http://localhost:3000');
    allowedOrigins.push('http://127.0.0.1:3000');
  }
  
  return allowedOrigins.some(allowed => origin.startsWith(allowed));
}

/**
 * Gets client IP from request headers
 */
export function getClientIp(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    headers.get('cf-connecting-ip') || // Cloudflare
    'unknown'
  );
}

/**
 * Checks if IP is in allowlist (for restricting direct Umami access)
 * Note: This should be configured on your Umami host firewall/network level
 */
export function isIpAllowed(ip: string): boolean {
  const allowedIps = process.env.ALLOWED_IPS?.split(',') || [];
  
  if (allowedIps.length === 0) {
    return true; // No restriction if not configured
  }
  
  return allowedIps.includes(ip);
}

/**
 * Sanitizes user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, 1000); // Limit length
}

