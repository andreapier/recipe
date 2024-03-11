import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export const authMiddleware = (middleware: (req: NextRequest) => NextResponse) =>
  withAuth(
    function onSuccess(req) {
      return middleware(req);
    },
    {
      callbacks: {
        authorized: ({ token }) => token != null,
      },
      pages: {
        signIn: "/api/auth/signin/credentials",
      },
    },
  );
