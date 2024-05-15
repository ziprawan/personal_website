// import Series from Output/series.json";
import Series from "@/assets/hsr/Output/series.json";
import { IMultiTextMap, ITextMap } from "@/types/textmap/text";
import { readFileSync } from "fs";
import SeriesCard from "./seriesCard";

const map: IMultiTextMap = {
  id: { 1: "Pilih salah satu seri achievement di bawah ini" },
  en: { 1: "Select one of the achievement series below" },
};

export default function SRAchievementsMain({ langCode }: { langCode: string }) {
  const lang = langCode.toLowerCase();
  const textData = JSON.parse(readFileSync(`assets/hsr/Output/Text/Text${lang.toUpperCase()}.json`).toString()) as ITextMap;

  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg">{map[lang][1]}:</div>
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
