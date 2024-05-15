"use client";

import Image from "next/image";
import AchievementCard from "./achievementCard";
import AchievementData from "#hsrOutput/achievements.json";
import SeriesJSON from "#hsrOutput/series.json";
import { IAchievementSeries } from "@/types/achievement/achseries";
import { IAchievementData } from "@/types/achievement/achdata";
import Link from "next/link";
import { ITextMap } from "@/types/textmap/text";
import { useState } from "react";

const series = SeriesJSON as { [k: string]: IAchievementSeries };

class SeriesID {
  seriesId: number;
  supportedSeries: string[];

  constructor(id: string) {
    this.supportedSeries = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    if (!this.supportedSeries.includes(id)) {
      throw new Error("Nope.");
    }
    this.seriesId = parseInt(id, 10);
  }

  get curr() {
    return this.seriesId;
  }

  get next() {
    const next = this.seriesId + 1;
    return next > 9 ? 1 : next;
  }

  get prev() {
    const prev = this.seriesId - 1;
    return prev < 1 ? 9 : prev;
  }
}

interface SRAchievementClientPageProps {
  params: { lang: string; seriesId: string };
  textData: ITextMap;
}

export default function SRAchievementClientPage({ params, textData }: SRAchievementClientPageProps) {
  const seriesId = new SeriesID(params.seriesId);
  const [showType, setShowType] = useState<number>(1);
  const [rarity, setRarity] = useState<number>(1);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-2 items-center">
        <Link href={`${seriesId.prev}`} className="w-1/3 flex flex-col gap-2 items-center">
          <Image src={`/hsr/images/ach_${seriesId.prev}.png`} width={44} height={44} alt="Achievement logo" />
          <div className="text-center text-sm w-fit">
            <div>{textData[series[seriesId.prev].titleHash]}</div>
            <div className="underline">&#60;&#60;&#60;</div>
          </div>
        </Link>
        <div className="w-1/3 flex flex-col gap-2 items-center">
          <Image src={`/hsr/images/ach_${seriesId.curr}.png`} width={44} height={44} alt="Achievement logo" />
          <div className="text-center text-sm w-fit">
            <div>{textData[series[seriesId.curr].titleHash]}</div>
            <div>&#8595;&#8595;&#8595;</div>
          </div>
        </div>
        <Link href={`${seriesId.next}`} className="w-1/3 flex flex-col gap-2 items-center">
          <Image src={`/hsr/images/ach_${seriesId.next}.png`} width={44} height={44} alt="Achievement logo" />
          <div className="text-center text-sm w-fit">
            <div>{textData[series[seriesId.next].titleHash]}</div>
            <div className="underline">&#62;&#62;&#62;</div>
          </div>
        </Link>
      </div>
      <hr></hr>
      <div className="flex gap-2">
        <div className="flex gap-1 items-center">
          <div>Type:</div>
          <div>
            <select
              value={showType}
              onChange={(e) => setShowType(parseInt(e.target.value))}
              className="bg-[#5C8374] px-[10px] py-1 rounded-md"
            >
              <option value={1}>All</option>
              <option value={2}>Hidden</option>
              <option value={3}>Visible</option>
            </select>
          </div>
        </div>
        <div className="flex gap-1 items-center">
          <div>Rarity:</div>
          <div>
            <select
              value={rarity}
              onChange={(e) => setRarity(parseInt(e.target.value))}
              className="bg-[#5C8374] px-[10px] py-1 rounded-md"
            >
              <option value={1}>All</option>
              <option value={2}>High</option>
              <option value={3}>Mid</option>
              <option value={4}>Low</option>
            </select>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="flex flex-col gap-1">
        {Object.values(AchievementData as any as { [k: string]: IAchievementData })
          .filter((a) => String(a.seriesId) === params.seriesId)
          .filter((a) => {
            if (showType === 2) return a.showType === "ShowAfterFinish";
            else if (showType === 3) return a.showType !== "ShowAfterFinish";
            else return true;
          })
          .filter((a) => {
            if (rarity === 2) return a.rarity === "High";
            else if (rarity === 3) return a.rarity === "Mid";
            else if (rarity === 4) return a.rarity === "Low";
            else return true;
          })
          .sort((a, b) => b.priority - a.priority)
          .map((a) => {
            return <AchievementCard key={`ach_${a.id}`} achievement={a as IAchievementData} textMap={textData} />;
          })}
      </div>
    </div>
  );
}
