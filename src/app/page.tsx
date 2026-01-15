"use client";

import ExperienceCard from "@/components/home/ExperienceCard";
import PhotoCarousel from "@/components/home/PhotoCarousel";
import Link from "next/link";
import { useState } from "react";

type Experience = {
  id: string;
  role: string;
  period: string;
  desc?: string;
};

const EXPERIENCES: Experience[] = [
  {
    id: "1",
    role: 'Magang, Kebutuhan Dasar IMT "Signum" ITB',
    period: "2025",
    desc: 'Membantu menyusun dan berkontribusi soal dan materi repositori IMT "Signum" ITB.',
  },
  {
    id: "2",
    role: 'Staff Kreatif, Wisuda Oktober IMT "Signum" ITB 2025',
    period: "2025",
    desc: 'Kerja sama dalam membuat properti untuk keperluan Wisuda Oktober IMT "Signum" ITB 2025.',
  },
  {
    id: "3",
    role: 'Staff Acara, Teleparty IMT "Signum" ITB',
    period: "2025",
    desc: "Membantu menyusun acara dan pembuatan menfess.",
  },
  {
    id: "4",
    role: 'Komisi Aspirasi, MPA IMT "Signum" ITB',
    period: "2025 - sekarang",
    desc:
      'Membantu penyaluran aspirasi dari anggota IMT "Signum" ITB, mengolahnya, serta menyampaikannya kepada pihak terkait.',
  },
];

const IMAGES = [
  {
    src: "/images/gimlantik.jpg",
    alt: "GIM Lantik",
    caption:
      "GIM Apprenticeship 2024 lantik dan resmi menjadi anggota GIM ITB. Foto bareng kelompok yang bareng-bareng bikin game untuk keperluan GIM JAM 2025.",
  },
  {
    src: "/images/GIMMakrab.jpg",
    alt: "Photo with many people to end the GIM Makrab 2025",
    caption:
      "Foto bersama untuk mengakhiri GIM Makrab 2025. Kegiatan yang dilakukan hampir selama 24 jam dari hari Sabtu, 12 April siang hari, hingga hari Ahad, 13 April siang hari juga. Siang hingga sore dipenuhi oleh games dan malam ngobrol bareng sama temen, hampir ga tidur (literally cuma 2 jam doang tidurnya). Paginya senam terus pada kecapean haha, sampe siang sambil nunggu angkot pulang.",
  },
  {
    src: "/images/imtlantik.jpg",
    alt: "IMT Lantik",
    caption:
      'SPEKTRUM 2025 lantik dan resmi menjadi anggota IMT "Signum" ITB. Foto dilakukan bersama dengan teman2 yang menjadi peserta SPEKTRUM 2025, diambil pada pagi hari yang sangat dingin. Jujur malamnya ngerasa beku, but it is worth to wait until the morning',
  },
];

export default function Home() {
  const [compact, setCompact] = useState(false);
  const [accent, setAccent] = useState(false);

  return (
    <main className="max-w-5xl mx-auto py-8">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-semibold leading-tight">Hi, I&apos;m Aziz Ridhwan Pratama</h1>
              <p className="text-sm text-slate-500 dark:text-slate-200 mt-1">Student - IMT &quot;Signum&quot; ITB</p>
            </div>

            <div className="flex gap-2 items-center">
              <button
                className={`px-3 py-1 rounded-md border hover:bg-slate-50 dark:hover:bg-slate-800 transition ${
                  accent ? "ring-2 ring-amber-400" : ""
                }`}
                onClick={() => setAccent((s) => !s)}
              >
                Accent
              </button>

              <button
                className="px-3 py-1 rounded-md bg-indigo-600 text-white hover:opacity-90 transition"
                onClick={() => setCompact((c) => !c)}
              >
                {compact ? "Expand" : "Compact"}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-medium">Experiences</h2>
            <div className={`grid gap-3 ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
              {EXPERIENCES.map((e) => (
                <ExperienceCard key={e.id} experience={e} compact={compact} accent={accent} />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-medium">More</h2>
            <div className="mt-2 flex gap-3">
              <Link
                className="px-4 py-2 rounded-md bg-[color:var(--background)] border border-slate-200 dark:border-slate-700 hover:scale-105 transition"
                href="/posts"
              >
                Posts
              </Link>
              <Link
                className="px-4 py-2 rounded-md bg-[color:var(--background)] border border-slate-200 dark:border-slate-700 hover:scale-105 transition"
                href="/tools"
              >
                Tools
              </Link>
            </div>
          </div>
        </div>

        <aside className="sticky top-24">
          <div className={`${accent ? "ring-4 ring-amber-300/30" : ""}`}>
            <PhotoCarousel images={IMAGES} />
          </div>
        </aside>
      </section>
    </main>
  );
}
