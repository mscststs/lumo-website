import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import "@/styles/globals.css";
import { BrandMark } from "@/components/brand/brand-mark";
import { Button } from "@/components/ui/button";
import { getLocale, localePath } from "@/lib/site-manifest";
import { translate } from "@/lib/i18n/translate";
import { LOCALE_PRELOAD_SCRIPT } from "@/lib/i18n/detect";
import { THEME_PRELOAD_SCRIPT } from "@/lib/theme/registry";

export const links = () => [
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "apple-touch-icon", href: "/brand/lumo-mark.svg" },
  { rel: "manifest", href: "/site.webmanifest" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const locale = getLocale(location.pathname);
  const lang = locale === "zh" ? "zh-CN" : "en";

  return (
    <html lang={lang} dir="ltr" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Before any markup: a Chinese browser lands on `/zh` without ever
            painting the English pre-render. */}
        <script dangerouslySetInnerHTML={{ __html: LOCALE_PRELOAD_SCRIPT }} />
        <meta name="color-scheme" content="light dark" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#faf9f6"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#0b0d10"
        />
        <script dangerouslySetInnerHTML={{ __html: THEME_PRELOAD_SCRIPT }} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function HydrateFallback() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background">
      <BrandMark className="h-10 w-10 animate-pulse motion-reduce:animate-none" />
    </div>
  );
}

export function ErrorBoundary({ error }: { error: unknown }) {
  const pathname =
    typeof window === "undefined" ? "/" : window.location.pathname;
  const locale = getLocale(pathname);
  const is404 = isRouteErrorResponse(error) && error.status === 404;
  const title = is404
    ? translate(locale, "notFound.title")
    : translate(locale, "notFound.serverTitle");
  const description = is404
    ? translate(locale, "notFound.description")
    : error instanceof Error
      ? error.message
      : translate(locale, "notFound.serverDescription");

  return (
    <main className="container-page flex min-h-dvh max-w-2xl flex-col items-start justify-center gap-5 py-20">
      <BrandMark className="h-10 w-10" />
      <p className="font-mono text-xs text-muted-foreground">
        {is404 ? "404" : "500"}
      </p>
      <h1 className="text-balance text-display-sm font-semibold text-foreground">
        {title}
      </h1>
      <p className="text-pretty text-base leading-7 text-muted-foreground">
        {description}
      </p>
      <Button asChild>
        <a href={localePath(locale, "/")}>
          {translate(locale, "notFound.home")}
        </a>
      </Button>
    </main>
  );
}
