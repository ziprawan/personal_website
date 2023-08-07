"use client";

import { TypePost } from "@/types/content-type/TypePost";
import ContentfulDate from "../contentful/date";
import ContentfulImage from "../contentful/image";
import { AssetFile } from "contentful";
import ContentfulRichText from "../contentful/richtext";
import ContentfulAuthor from "../contentful/author";
import { useContext } from "react";
import DarkModeContext, {
  DarkModeContextProps,
} from "@/context/darkmode/darkmode";

type params = {
  post: TypePost;
};

export default function PostBody({ post }: params) {
  const img = post.fields.coverImage;
  const file = img ? (img.fields.file as AssetFile) : undefined;
  const { darkMode } = useContext(DarkModeContext) as DarkModeContextProps;
  const borderColor = darkMode ? "border-white" : "border-slate-600";

  return (
    <div
      className={`container py-2 max-w-4xl m-auto block border border-dashed ${borderColor}`}
    >
      <div
        className={`text-4xl font-bold p-4 border-b border-dashed ${borderColor}`}
      >
        {post.fields.title}
      </div>
      <div
        className={`flex p-4 justify-between border-b border-dashed ${borderColor}`}
      >
        <ContentfulAuthor
          name={post.fields.author.fields.name}
          photo={post.fields.author.fields.picture.fields}
        />
        <ContentfulDate date={post.sys.createdAt} prefix="Posted at: " />
      </div>
      {img && file ? (
        <div
          className={`overflow-hidden border-b border-dashed ${borderColor}`}
        >
          <div className="p-4">
            <ContentfulImage
              alt={img.fields.description as string}
              src={file.url}
              width={file.details.image?.width}
              height={file.details.image?.height}
              className="rounded-lg mx-auto"
            />
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="p-4">
        <ContentfulRichText content={post.fields.content} />
      </div>
    </div>
  );
}
