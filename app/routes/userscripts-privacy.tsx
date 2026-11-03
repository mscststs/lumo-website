import { PrivacyPage, privacyMeta } from "@/components/privacy/privacy-page";

export function meta({ location }: { location: { pathname: string } }) {
  return privacyMeta("userscripts", location.pathname);
}

export default function UserscriptsPrivacyRoute() {
  return <PrivacyPage product="userscripts" />;
}
