import NextAuth from 'next-auth';
import Resend from 'next-auth/providers/resend';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.EMAIL_FROM || 'CMS <cms@neo14.com>',
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // SERVER-SIDE ONLY domain restriction
      // Frontend accepts any email, but server rejects non-@neo14.com during verification
      if (user.email && user.email.endsWith('@neo14.com')) {
        return true;
      }
      return false; // Reject non-neo14 emails
    },
    async session({ session, token }) {
      // Include user info in session
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/admin/login',
    verifyRequest: '/admin/verify',
    error: '/admin/error',
  },
  session: {
    strategy: 'jwt',
  },
});

