import createMiddleware from "next-intl/middleware";
import { locales, localePrefix, pathnames } from "./navigation";

export default createMiddleware({
  locales,
  defaultLocale: "it",
  localePrefix,
  pathnames,
});

export const config = {
  matcher: ["/", "/(en|it)/:path*"],
  //matcher: ["/((?!api|_next|.*\\..*).*)"],
};
