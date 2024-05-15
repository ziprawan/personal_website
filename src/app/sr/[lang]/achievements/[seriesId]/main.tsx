import AchievementData from "@/assets/hsr/Output/achievements.json";
import { IAchievementData } from "@/types/achievement/achdata";
import { ITextMap } from "@/types/textmap/text";
import { readFileSync } from "fs";
import AchievementCard from "./achievementCard";

interface SRAchievementSeriesDetailPageProps {
  params: { lang: string; seriesId: string };
}

export default function SRAchievementSeriesDetailMain({ params }: SRAchievementSeriesDetailPageProps) {
  const lang = params.lang.toLowerCase();
  const textData = JSON.parse(readFileSync(`assets/hsr/Output/Text/Text${lang.toUpperCase()}.json`).toString()) as ITextMap;

  return (
    <div>
      <div className="flex flex-col gap-1">
        {Object.values(AchievementData)
          .filter((a) => String(a.seriesId) === params.seriesId)
          .sort((a, b) => b.priority - a.priority)
          .map((a) => {
            return <AchievementCard key={`ach_${a.id}`} achievement={a as IAchievementData} textMap={textData} />;
          })}
      </div>
    </div>
  );
}
