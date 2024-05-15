import { ITextMap } from "@/types/textmap/text";
import { readFileSync } from "fs";
import SRAchievementClientPage from "./client";

interface SRAchievementSeriesDetailPageProps {
  params: { lang: string; seriesId: string };
}

export default function SRAchievementSeriesDetailMain({ params }: SRAchievementSeriesDetailPageProps) {
  const lang = params.lang.toLowerCase();
  const textData = JSON.parse(
    readFileSync(`${process.cwd()}/assets/hsr/Output/Text/Text${lang.toUpperCase()}.json`).toString()
  ) as ITextMap;

  return <SRAchievementClientPage params={params} textData={textData} />;
}
