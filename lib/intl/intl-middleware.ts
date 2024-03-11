import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales, localePrefix, pathnames } from "@/lib/intl/navigation";

export const intlMiddleware = createMiddleware({
  locales,
  localePrefix,
  defaultLocale,
  pathnames,
});
