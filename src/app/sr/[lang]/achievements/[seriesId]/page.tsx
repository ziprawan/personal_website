import LangNotSupported from "@/components/fallbacks/lang-not-supported";
import SRAchievementSeriesDetailMain from "./main";
import SRAchievementSerisNotFoundPage from "./notFound";

interface SRAchievementSeriesDetailPageProps {
  params: { lang: string; seriesId: string };
}

const supportedLangs = ["EN", "ID"];
const supportedSeries = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

export async function generateStaticParams() {
  const res: { lang: string; seriesId: string }[] = [];

  supportedLangs.forEach((i) => {
    supportedSeries.forEach((j) => {
      res.push({ lang: i, seriesId: j });
    });
  });

  return res;
}

export default function SRAchievementsPage({ params }: SRAchievementSeriesDetailPageProps) {
  if (supportedLangs.includes(params.lang.toUpperCase())) {
    if (supportedSeries.includes(params.seriesId)) {
      return <SRAchievementSeriesDetailMain params={params} />;
    } else {
      return <SRAchievementSerisNotFoundPage seriesId={params.seriesId} />;
    }
  } else {
    return <LangNotSupported langCode={params.lang} />;
  }
}
