import { DEFAULT_LOCALE, getLocale } from "../app/lib/site-manifest";
import {
  isRewritableContentType,
  rewriteOrigin,
  SITE_ORIGIN_PLACEHOLDER,
} from "../app/lib/site-origin";

interface AssetsBinding {
  fetch(request: Request): Promise<Response>;
}

interface Env {
  ASSETS: AssetsBinding;
}

/**
 * Assets-only Worker: it serves the pre-rendered site and rewrites the build's
 * placeholder origin (`https://site.invalid`) to the origin of the incoming
 * request, so canonical, hreflang, Open Graph, JSON-LD, `sitemap.xml` and
 * `robots.txt` are correct on any domain without build-time configuration.
 *
 * It also gives unknown URLs a 404 document in the requested language: the
 * asset layer can only serve one `404.html`, so a `/zh/...` miss is answered
 * with the pre-rendered Chinese not-found page. Everything else is untouched.
 */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    let response = await env.ASSETS.fetch(request);

    if (shouldServeLocalizedNotFound(url.pathname, response)) {
      const localized = await env.ASSETS.fetch(
        new Request(new URL("/zh/404", url), {
          method: "GET",
          headers: request.headers,
        }),
      );
      if (localized.ok) {
        response = new Response(await localized.text(), {
          status: 404,
          statusText: "Not Found",
          headers: localized.headers,
        });
      }
    }

    if (
      request.method === "HEAD" ||
      !isRewritableContentType(response.headers.get("content-type"))
    ) {
      return response;
    }

    const body = await response.text();
    if (!body.includes(SITE_ORIGIN_PLACEHOLDER)) {
      return withBody(response, body);
    }

    return withBody(response, rewriteOrigin(body, url.origin));
  },
};

/** A missing page under a non-default locale should speak that locale. */
function shouldServeLocalizedNotFound(
  pathname: string,
  response: Response,
): boolean {
  return (
    response.status === 404 &&
    getLocale(pathname) !== DEFAULT_LOCALE &&
    isRewritableContentType(response.headers.get("content-type"))
  );
}

/**
 * Rebuilds the response around a decoded body: the asset layer may hand back a
 * compressed payload, so encoding and length headers no longer describe it.
 */
function withBody(response: Response, body: string): Response {
  const headers = new Headers(response.headers);
  headers.delete("content-encoding");
  headers.delete("content-length");

  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
