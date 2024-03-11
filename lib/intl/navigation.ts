import { createLocalizedPathnamesNavigation, Pathnames } from "next-intl/navigation";

export const locales = ["en", "it"] as const;
export const defaultLocale = "it";
export const localePrefix = "as-needed";
export const pathnames = {
  "/": "/",
  "/tags": {
    en: "/tags",
    it: "/tag",
  },
  "/recipes": {
    en: "/recipes",
    it: "/ricette",
  },
  "/recipes/[slug]": {
    en: "/recipes/[slug]",
    it: "/ricette/[slug]",
  },
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } = createLocalizedPathnamesNavigation({
  locales,
  localePrefix,
  pathnames: pathnames as typeof pathnames & Record<string & {}, string>,
});
