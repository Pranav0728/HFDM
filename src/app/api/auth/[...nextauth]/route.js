// route.js
import NextAuth from "next-auth";
import { authOptions } from "./option"; // Import the authOptions from authOptions.js

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
