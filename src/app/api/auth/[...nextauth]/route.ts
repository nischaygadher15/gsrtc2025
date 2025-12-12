import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID!,
      clientSecret: process.env.NEXT_PUBLIC_AUTH_GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
});

export { handler as GET, handler as POST };
