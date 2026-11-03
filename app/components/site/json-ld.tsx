export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from local constants, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      // Absolute URLs inside the payload use the build placeholder and are
      // rewritten to the request origin by the Worker before the document is
      // served. That rewrite is intentional, so the hydration comparison of
      // the inline JSON is silenced — there is nothing to patch up.
      suppressHydrationWarning
    />
  );
}
