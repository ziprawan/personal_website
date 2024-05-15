import { IMultiTextMap } from "@/types/textmap/text";

const map: IMultiTextMap = {
  id: { 1: "Pilih menu", 2: "Daftar achievement (pencapaian) HSR" },
  en: { 1: "Select menu", 2: "HSR Achievements list" },
};

export default function SRLangMain({ langCode }: { langCode: string }) {
  const lang = langCode.toLowerCase();
  return (
    <div>
      <div className="text-lg">{map[lang][1]}:</div>
      <div className="text-lg text-blue-500 hover:underline hover:text-blue-700">
        <a href={`/sr/${langCode}/achievements`}>{map[lang][2]}</a>
      </div>
    </div>
  );
}
