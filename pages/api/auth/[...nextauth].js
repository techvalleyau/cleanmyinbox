import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.modify",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      console.log("JWT callback called");
      console.log("token:", token);
      console.log("account:", account);
      console.log("user:", user);

      // On initial sign in
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.id = user?.id || null;
      }
      return token;
    },

    async session({ session, token }) {
      console.log("Session callback called");
      console.log("session:", session);
      console.log("token:", token);

      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user.id = token.id || null;

      return session;
    },
  },
  debug: true, // Enable debug mode to see detailed logs in Vercel logs
});
