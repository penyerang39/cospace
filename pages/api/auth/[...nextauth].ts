import NextAuth, { NextAuthOptions } from 'next-auth';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: 'email',
      name: 'Email',
      type: 'email',
      from: process.env.EMAIL_FROM || 'admin@neo14.com',
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
                <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 28px;">Cospace CMS</h1>
                  </div>
                  <div style="background: #f9fafb; padding: 40px 30px; border-radius: 0 0 10px 10px;">
                    <p style="font-size: 16px; margin-bottom: 30px;">Click the button below to sign in to the Cospace CMS admin panel:</p>
                    <div style="text-align: center; margin: 40px 0;">
                      <a href="${url}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 40px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; font-size: 16px;">Sign In to CMS</a>
                    </div>
                    <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">This link will expire in 24 hours. If you didn't request this email, you can safely ignore it.</p>
                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
                    <p style="font-size: 12px; color: #9ca3af; text-align: center;">Cospace by Neo14 © ${new Date().getFullYear()}</p>
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
    },
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
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

