import { IAchievementData } from "@/types/achievement/achdata";
import { ITextMap } from "@/types/textmap/text";
import { formatAchievementText } from "./format";
import Image from "next/image";

export default function AchievementCard({ achievement, textMap }: { achievement: IAchievementData; textMap: ITextMap }) {
  let jades = 0;

  switch (achievement.rarity) {
    case "High":
      jades = 20;
      break;
    case "Mid":
      jades = 10;
      break;
    case "Low":
      jades = 5;
      break;
  }

  return (
    <div className="bg-[#5C8374] mt-2 rounded-md p-3 flex justify-between items-center">
      <div className="w-5/6">
        <div className="font-bold">{formatAchievementText(textMap[achievement.titleHash])}</div>
        <div className="italic">{formatAchievementText(textMap[achievement.descriptionHash], achievement.params)}</div>
      </div>
      <div className="text-center">
        <div className="flex gap-1">
          <div>{jades}</div>
          <div>
            <Image src={"/hsr/images/stellar_jade.png"} alt="Stellar Jade" width={24} height={24} quality={100} />
          </div>
        </div>
        {/* <div>{achievement.priority}</div> */}
      </div>
    </div>
  );
}
