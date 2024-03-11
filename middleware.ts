import { authMiddleware } from "@/lib/auth/auth-middleware";
import { intlMiddleware } from "@/lib/intl/intl-middleware";
import { NextRequest } from "next/server";

const locales = ["en", "it"];
const publicPages = ["/", "/login"];

const authAndIntlMiddleware = authMiddleware(intlMiddleware);

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(`^(/(${locales.join("|")}))?(${publicPages.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`, "i");
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authAndIntlMiddleware as any)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)", "/", "/(en|it)/:path*"],
};
