import { PrivacyPage, privacyMeta } from "@/components/privacy/privacy-page";

export function meta({ location }: { location: { pathname: string } }) {
  return privacyMeta("lumo", location.pathname);
}

export default function LumoPrivacyRoute() {
  return <PrivacyPage product="lumo" />;
}
