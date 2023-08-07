"use client";

import { TypePost } from "@/types/content-type/TypePost";
import ContentfulImage from "../contentful/image";
import { AssetFile } from "contentful";
import ContentfulDate from "../contentful/date";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useContext } from "react";
import DarkModeContext, {
  DarkModeContextProps,
} from "@/context/darkmode/darkmode";

type postCardtype = {
  field: TypePost["fields"];
  shadow?: boolean;
  noHover?: boolean;
};

export default function PostCard({
  field,
  shadow = true,
  noHover = false,
}: postCardtype) {
  const { darkMode } = useContext(DarkModeContext) as DarkModeContextProps;
  const img = field.coverImage;
  const file = img ? (img.fields.file as AssetFile) : undefined;

  return (
    <Link href={`/posts/${field.slug}`}>
      <div
        className={`flex ${darkMode ? "bg-slate-900" : "bg-gray-100"} ${
          shadow ? "transition-all shadow-md hover:shadow-xl" : ""
        } font-sans my-4 outline outline-1 rounded-md overflow-hidden h-36 xl:h-48 duration-300`}
      >
        {img && file ? (
          <div className="outline outline-1 w-1/3 xl:w-1/5 flex content-center bg-pink-50 overflow-hidden">
            <ContentfulImage
              src={file.url}
              alt={img.fields.description ?? ""}
              width={file.details.image?.width}
              height={file.details.image?.height}
              className={`object-cover object-center transition-all duration-500 ease-in-out ${
                noHover ? "" : "hover:scale-[1.1]"
              }`}
            />
          </div>
        ) : (
          <></>
        )}
        <div
          className={`px-4 py-2 ${img && file ? "w-2/3 xl:w-4/5" : "w-full"}`}
        >
          <div className="font-bold text-2xl">{field.title}</div>
          <ContentfulDate date={field.date} />
          <div
            className={`text-sm ${
              darkMode ? "text-white" : "text-slate-500"
            } text-justify whitespace-pre-line transition-all duration-300`}
          >
            <ReactMarkdown>{field.excerpt}</ReactMarkdown>
          </div>
        </div>
      </div>
    </Link>
  );
}
