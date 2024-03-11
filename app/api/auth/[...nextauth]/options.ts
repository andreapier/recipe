import CredentialsProvider from "next-auth/providers/credentials";
// import Facebook from "next-auth/providers/facebook";
import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
import bcrypt from "bcrypt";
import type { AuthOptions as NextAuthConfig } from "next-auth";
import { UserModel } from "@/lib/db/user-schema";

export const options: NextAuthConfig = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  // pages: {
  //   signIn: "/auth/login",
  // },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Credentials authorize", credentials);
        if (!credentials) {
          return null;
        }

        const user = await UserModel.findOne({ username: credentials.username });
        if (!user) {
          return null;
        }

        const passwordOk = await bcrypt.compare(credentials.password, user.password);
        if (passwordOk) {
          return {
            id: user._id.toString(),
            username: user.username,
          };
        } else {
          return null;
        }
      },
    }),
    // Facebook({
    //   clientId: process.env.AUTH_FACEBOOK_ID as string,
    //   clientSecret: process.env.AUTH_FACEBOOK_SECRET as string,
    // }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
    // Google({
    //   clientId: process.env.AUTH_GOOGLE_ID as string,
    //   clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    // }),
  ],
  //   basePath: "/auth",
  //   callbacks: {
  //     authorized({ request, auth }) {
  //       const { pathname } = request.nextUrl;
  //       if (pathname === "/middleware-example") return !!auth;
  //       return true;
  //     },
  //     jwt({ token, trigger, session }) {
  //       if (trigger === "update") token.name = session.user.name;
  //       return token;
  //     },
  //   },
};
