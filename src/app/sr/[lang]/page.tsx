import LangNotSupported from "@/components/fallbacks/lang-not-supported";
import SRLangMain from "./main";

interface SRLangPageProps {
  params: { lang: string };
}

const supportedLangs = ["EN", "ID"];

export default function SRLangPage({ params }: SRLangPageProps) {
  if (supportedLangs.includes(params.lang.toUpperCase())) {
    return <SRLangMain langCode={params.lang} />;
  } else {
    return <LangNotSupported langCode={params.lang} />;
  }
}
