import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Define types for credentials and session
interface Credentials {
  email?: string;
  password?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Credentials) {
        const { email, password } = credentials || {};

        if (!email || !password) {
          return null; // Return null if credentials are missing
        }

        try {
          await dbConnect();
          const user = await User.findOne({ email });

          if (!user) {
            return null; // User not found
          }

          if (user.password !== password) {
            return null; // Incorrect password
          }

          return user; // Return the user object if credentials are correct
        } catch (error) {
          console.error("Error: ", error);
          return null; // Return null in case of an error
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      // If the user is authenticated, add user data to JWT
      if (user) {
        token.id = user._id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // Add user data to the session
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: "dsdsadsadasdsadasddas", // Secret for JWT encoding
  pages: {
    signIn: "/login", // Custom sign-in page
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
