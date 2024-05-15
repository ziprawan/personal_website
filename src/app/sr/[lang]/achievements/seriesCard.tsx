import { IAchievementSeries } from "@/types/achievement/achseries";
import { ITextMap } from "@/types/textmap/text";
import Image from "next/image";
import Link from "next/link";

export default function SeriesCard({ series, textMap }: { series: IAchievementSeries; textMap: ITextMap }) {
  return (
    <Link href={`achievements/${series.id}`} className="bg-[#5C8374] mt-2 p-3 w-fit rounded-md">
      <div className="flex gap-2 items-center">
        <div className="overflow-hidden">
          <Image
            src={`/hsr/images/ach_${series.id}.png`}
            alt={`Achievement #${series.id} logo`}
            width={52}
            height={52}
            quality={100}
          />
        </div>
        <div>{textMap[series.titleHash]}</div>
        <div>•</div>
        <div className="text-sm">{series.members.length}</div>
      </div>
    </Link>
  );
}
