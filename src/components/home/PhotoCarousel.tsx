"use client";

import Image from "next/image";
import { useState } from "react";

type Img = {
  src: string;
  alt?: string;
  caption?: string;
};

export default function PhotoCarousel({ images }: { images: Img[] }) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  function prev() {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }

  function next() {
    setIndex((i) => (i + 1) % images.length);
  }

  return (
    <div className="w-full">
      <div className="relative rounded-lg overflow-hidden">
        <Image
          src={images[index].src}
          alt={images[index].alt ?? "photo"}
          width={800}
          height={520}
          className="object-cover w-full h-[260px] md:h-[360px]"
        />

        <button
          aria-label="previous photo"
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-2 hover:bg-black/40"
        >
          ◀
        </button>

        <button
          aria-label="next photo"
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-2 hover:bg-black/40"
        >
          ▶
        </button>
      </div>

      <div className="mt-2 px-2 py-3 bg-white dark:bg-slate-800 rounded-b-md">
        <div className="flex flex-col gap-2 items-center justify-between">
          <div className="flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                aria-label={`jump to ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full ${i === index ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-600"}`}
              />
            ))}
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-200">{images[index].caption}</p>
        </div>
      </div>
    </div>
  );
}
