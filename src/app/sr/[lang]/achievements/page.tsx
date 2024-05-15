import LangNotSupported from "@/components/fallbacks/lang-not-supported";
import SRAchievementsMain from "./main";

interface SRLangPageProps {
  params: { lang: string };
}

const supportedLangs = ["EN", "ID"];

export default function SRAchievementsPage({ params }: SRLangPageProps) {
  if (supportedLangs.includes(params.lang.toUpperCase())) {
    return <SRAchievementsMain langCode={params.lang} />;
  } else {
    return <LangNotSupported langCode={params.lang} />;
  }
}
