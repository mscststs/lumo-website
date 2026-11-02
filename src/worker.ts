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
 * Nothing else is transformed, and the body is only read for text responses.
 */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const response = await env.ASSETS.fetch(request);

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

    return withBody(response, rewriteOrigin(body, new URL(request.url).origin));
  },
};

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
