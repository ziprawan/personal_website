// import Series from Output/series.json";
import Achievement from "#hsrOutput/achievements.json";
import Series from "#hsrOutput/series.json";
import { IMultiTextMap, ITextMap } from "@/types/textmap/text";
import { readFileSync } from "fs";
import SeriesCard from "./seriesCard";

const map: IMultiTextMap = {
  id: { 1: "Pilih salah satu seri achievement di bawah ini", 2: "Total achievement saat ini" },
  en: { 1: "Select one of the achievement series below", 2: "Achievement total for now is" },
};

export default function SRAchievementsMain({ langCode }: { langCode: string }) {
  const lang = langCode.toLowerCase();
  const textData = JSON.parse(
    readFileSync(`${process.cwd()}/assets/hsr/Output/Text/Text${lang.toUpperCase()}.json`).toString()
  ) as ITextMap;

  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg">{map[lang][1]}:</div>
      <div className="text-lg">
        {map[lang][2]}: {Object.keys(Achievement).length}
      </div>
      <div className="flex flex-col gap-1 ml-2">
        {Object.values(Series)
          .sort((a, b) => a.id - b.id)
          .map((s) => {
            return <SeriesCard key={`series_${s.id}`} series={s} textMap={textData} />;
          })}
      </div>
    </div>
  );
}
