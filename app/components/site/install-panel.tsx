import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BrandMark, type BrandVariant } from "@/components/brand/brand-mark";
import { LocaleLink } from "@/components/site/locale-link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface InstallChannel {
  title: string;
  detail: string;
  href: string;
}

export interface InstallFact {
  label: string;
  value: string;
}

/**
 * The download block shared by both product pages.
 *
 * Shaped after the download pages on technical products: one primary action in
 * the store, the delivery facts next to it, and the alternative channels
 * demoted to a list. No slogans — every line is either a fact (platform,
 * licence, update behaviour) or a link.
 */
export function InstallPanel({
  brand,
  name,
  store,
  facts,
  channelsTitle,
  channels,
  privacy,
  className,
}: {
  brand: BrandVariant;
  name: string;
  store: { href: string; label: string; tagline: string };
  facts: InstallFact[];
  channelsTitle: string;
  channels: InstallChannel[];
  privacy: { href: string; label: string };
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="flex flex-col gap-6 rounded-card border border-border bg-card p-6 shadow-card sm:p-8">
          <div className="flex flex-wrap items-center gap-4">
            <BrandMark variant={brand} className="h-11 w-11" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-semibold text-foreground">{name}</p>
              <p className="text-xs text-muted-foreground">{store.tagline}</p>
            </div>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href={store.href} target="_blank" rel="noreferrer noopener">
                {store.label}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-4 border-t border-border pt-5">
            {facts.map((fact) => (
              <div key={fact.label} className="min-w-0">
                <dt className="text-2xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-sm text-foreground">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col gap-3 rounded-card border border-border bg-card p-6 shadow-surface">
          <p className="text-2xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            {channelsTitle}
          </p>
          <ul className="flex flex-col gap-0.5">
            {channels.map((channel) => (
              <li key={channel.href}>
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-start justify-between gap-3 rounded-control px-3 py-2.5 transition-colors hover:bg-accent"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-foreground">
                      {channel.title}
                    </span>
                    <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">
                      {channel.detail}
                    </span>
                  </span>
                  <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-end px-1">
        <LocaleLink
          to={privacy.href}
          className="inline-flex items-center gap-1 text-xs font-medium text-foreground transition-colors hover:text-primary"
        >
          {privacy.label}
          <ArrowRight className="h-3.5 w-3.5" />
        </LocaleLink>
      </div>
    </div>
  );
}
