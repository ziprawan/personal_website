"use client";

import { BLOCKS, TopLevelBlock } from "@contentful/rich-text-types";
import contentMapper from "./mapper";
import { useContext } from "react";
import DarkModeContext, {
  DarkModeContextProps,
} from "@/context/darkmode/darkmode";

export default function RichTextListItem({
  content,
}: {
  content: TopLevelBlock;
}) {
  const { darkMode } = useContext(DarkModeContext) as DarkModeContextProps;

  return content.content.map((cont, idx) => {
    switch (cont.nodeType) {
      case BLOCKS.LIST_ITEM: {
        return (
          <li key={idx}>
            {cont.content.map((c, li_idx) => {
              return contentMapper(c as TopLevelBlock, darkMode, li_idx);
            })}
          </li>
        );
      }
      default: {
        return (
          <li key={idx}>
            &#123;mapper: ul_list: unsupported nodeType: {cont.nodeType}
            &#125;
          </li>
        );
      }
    }
  });
}
