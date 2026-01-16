"use client";
import ToolCard from "@/components/tools/ToolCard";
import { FaTools } from "react-icons/fa";

const TOOLS: { title: string; description: string; slug: string }[] = [
  {
    title: "IPK Calc",
    slug: "ip-calc",
    description:
      "Calc is short for calculator btw. Anyway, bantu hitung IPS dan/atau IPK (jika diberikan IPK dan SKS saat ini) Anda, serta dapat mengambil template matkul sesuai jurusan sesuai data kurikulum aktif terbaru.",
  },
];

export default function ToolsPage() {
  return (
    <main className="flex flex-col items-center py-8">
      <div className="w-full text-center mb-14">
        <div className="flex justify-center items-center mb-4">
          <FaTools size={64} />
        </div>
        <h1 className="text-3xl font-bold mb-5">Tools</h1>
        <p className="text-lg text-muted-foreground mb-7 leading-6 font-light">
          Some tools that I made when I am bored.
          <br />
          Nothing fancy actually. Just take a look.
        </p>
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOOLS.map((tool, i) => (
          <ToolCard key={`tool_${i}`} title={tool.title} description={tool.description} slug={tool.slug} />
        ))}
      </div>
    </main>
  );
}
