import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/react";
import clsx from "clsx";
import { NextIntlClientProvider, useMessages } from "next-intl";

export interface LayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children, params: { locale } }: LayoutProps) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <head />
      <body className={clsx("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div className="relative flex flex-col h-screen">
              <Navbar />
              <main className="container mx-auto max-w-7xl flex-grow">{children}</main>
              <footer className="w-full flex items-center justify-center py-1">
                <Link
                  isExternal
                  className="flex items-center gap-1 text-current"
                  href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
                  title="nextui.org homepage"
                >
                  <span className="text-default-600">Powered by</span>
                  <p className="text-primary">NextUI</p>
                </Link>
              </footer>
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
