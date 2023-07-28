import bcrypt from "bcrypt"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import * as z from "zod"
import prisma from "@/lib/prismadb"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, 'Password should be minimum 5 characters'),
});

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {

        const { email, password } = formSchema.parse(credentials);

        if (!email || !password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: email
          }
        });

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        const isCorrectPassword = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }

        return user;
      }
    })
  ],
  callbacks: {
    session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      return session;
    },
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
        token.username = account.username;
      }
      return token;
    },
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/login',
    newUser: '/register'
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
