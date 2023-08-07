"use client";

import { Document } from "@contentful/rich-text-types";
import contentMapper from "./mapper";
import { useContext } from "react";
import DarkModeContext, {
  DarkModeContextProps,
} from "@/context/darkmode/darkmode";

type params = {
  content: Document;
};

export default function ContentfulRichText({ content }: params) {
  const contents = content.content;
  const { darkMode } = useContext(DarkModeContext) as DarkModeContextProps;

  return (
    <div>
      {contents.map((content, idx) => {
        return (
          <div key={idx} className="my-4">
            {contentMapper(content, darkMode)}
          </div>
        );
      })}
    </div>
  );
}
