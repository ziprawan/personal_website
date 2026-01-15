"use client";

import React from "react";

type Props = {
  experience: {
    id: string;
    role: string;
    period: string;
    desc?: string;
  };
  compact?: boolean;
  accent?: boolean;
};

export default function ExperienceCard({ experience, compact = false, accent = false }: Props) {
  return (
    <article
      className={`p-4 rounded-md border transition transform hover:-translate-y-1 hover:shadow-lg ${
        compact ? "text-sm p-3" : ""
      } ${accent ? "border-amber-300" : "border-slate-200 dark:border-slate-600"}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{experience.role}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-200">{experience.period}</p>
        </div>
      </div>

      {experience.desc ? <p className="mt-2 text-sm text-slate-600 dark:text-slate-200">{experience.desc}</p> : null}
    </article>
  );
}
