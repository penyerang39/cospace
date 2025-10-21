import NextAuth, { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { Resend } from 'resend';
import { UpstashRedisAdapter } from '../../../lib/upstash-adapter';

const resend = new Resend(process.env.RESEND_API_KEY);

export const authOptions: NextAuthOptions = {
  adapter: UpstashRedisAdapter(),
  providers: [
    EmailProvider({
      server: {
        host: 'smtp.resend.com',
        port: 465,
        auth: {
          user: 'resend',
          pass: process.env.RESEND_API_KEY,
        },
      },
      from: process.env.EMAIL_FROM || 'admin@neo14.com',
      maxAge: 24 * 60 * 60, // 24 hours
      async sendVerificationRequest({ identifier: email, url }) {
        // Restrict to @neo14.com domains only
        if (!email.endsWith('@neo14.com')) {
          throw new Error('Only @neo14.com email addresses are allowed');
        }

        try {
          await resend.emails.send({
            from: process.env.EMAIL_FROM || 'CMS Admin <admin@neo14.com>',
            to: email,
            subject: 'Sign in to Cospace CMS',
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Sign in to Cospace CMS</title>
                </head>
                <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #171717; max-width: 600px; margin: 0 auto; padding: 20px; background: #ffffff;">
                  <div style="background: #679bff; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">Cospace CMS</h1>
                  </div>
                  <div style="background: #ffffff; padding: 40px 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
                    <p style="font-size: 16px; margin-bottom: 30px; color: #171717;">Click the button below to sign in to the Cospace CMS admin panel:</p>
                    <div style="text-align: center; margin: 40px 0;">
                      <a href="${url}" style="background: #679bff; color: white; padding: 14px 40px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; font-size: 16px; transition: background-color 200ms ease;">Sign In to CMS</a>
                    </div>
                    <p style="font-size: 14px; color: #7D8DAA; margin-top: 30px;">This link will expire in 24 hours. If you didn't request this email, you can safely ignore it.</p>
                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
                    <p style="font-size: 12px; color: #7D8DAA; text-align: center;">Cospace by Neo14 © ${new Date().getFullYear()}</p>
                  </div>
                </body>
              </html>
            `,
          });
        } catch (error) {
          console.error('Error sending email:', error);
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
    verifyRequest: '/admin/verify',
    error: '/admin/error',
  },
  callbacks: {
    async signIn({ user }) {
      // Additional check: only allow @neo14.com domains
      if (user.email && user.email.endsWith('@neo14.com')) {
        return true;
      }
      return false;
    },
    async session({ session, user }) {
      if (session.user && user) {
        session.user.email = user.email;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

