"use client";

import { BLOCKS, INLINES, TopLevelBlock } from "@contentful/rich-text-types";
import markers from "./marks";
import Link from "next/link";
import { TypePost } from "@/types/content-type/TypePost";
import ContentfulDate from "../date";
import { useContext } from "react";
import DarkModeContext, {
  DarkModeContextProps,
} from "@/context/darkmode/darkmode";

export default function Blocks({ content }: { content: TopLevelBlock }) {
  let entryIsFirst = true;
  const nodeTypes = content.content.map((c) => c.nodeType);
  const { darkMode } = useContext(DarkModeContext) as DarkModeContextProps;

  return (
    <div
      className={`whitespace-pre-wrap ${
        nodeTypes.includes(INLINES.EMBEDDED_ENTRY) ? "flex" : ""
      }`}
    >
      {content.content.map((c, idx) => {
        switch (c.nodeType) {
          case "text":
            entryIsFirst = c.value === "";
            return markers(c, idx);
          case BLOCKS.PARAGRAPH:
            entryIsFirst = false;
            return c.content.map((paragraph, p_idx) => {
              if (paragraph.nodeType === "text")
                return (
                  <p key={p_idx} className="my-2">
                    {markers(paragraph, p_idx)}
                  </p>
                );
              else
                return (
                  <div key={p_idx}>
                    &#123;err: paragraph: {paragraph.nodeType} not
                    implemented&#125;
                  </div>
                );
            });
          case INLINES.HYPERLINK:
            entryIsFirst = false;
            return (
              <a
                key={idx}
                href={c.data.uri as string}
                className={`transition-colors duration-300 ${
                  darkMode
                    ? "text-blue-400 hover:text-blue-200"
                    : "text-blue-500 hover:text-blue-800"
                } hover:underline`}
                target="_blank"
              >
                {c.content.map((hyperlink, h_idx) => {
                  if (hyperlink.nodeType === "text") {
                    return markers(hyperlink, h_idx);
                  }
                  return (
                    <div key={h_idx}>
                      &#123;blocks: hyperlink: {hyperlink.nodeType} not
                      implemented&#125;
                    </div>
                  );
                })}
              </a>
            );
          case INLINES.ENTRY_HYPERLINK:
            entryIsFirst = false;
            return (
              <Link
                key={idx}
                href={`/posts/${(c.data.target as TypePost).fields.slug}`}
                className={`transition-colors duration-300 ${
                  darkMode
                    ? "text-blue-400 hover:text-blue-200"
                    : "text-blue-500 hover:text-blue-800"
                } hover:underline`}
              >
                {c.content.map((entryHyperlink, eh_idx) => {
                  if (entryHyperlink.nodeType === "text") {
                    return markers(entryHyperlink, eh_idx);
                  }
                  return (
                    <div key={eh_idx}>
                      &#123;blocks: entry_hyperlink: ${entryHyperlink.nodeType}{" "}
                      not implemented
                    </div>
                  );
                })}
              </Link>
            );
          case INLINES.EMBEDDED_ENTRY: {
            const field = c.data.target.fields;
            return (
              <Link href={`/posts/${field.slug}`} key={idx}>
                <div
                  className={`flex duration-300 ${entryIsFirst ? "" : "ml-2"} ${
                    darkMode ? "bg-slate-900" : "bg-gray-100"
                  } font-sans outline outline-1 rounded-md w-fit px-2`}
                >
                  <div className="font-bold text-sm">{field.title}</div>
                  <ContentfulDate className="pl-1" date={field.date} />
                </div>
              </Link>
            );
          }
          default:
            console.warn(`Unknown nodeType: ${c.nodeType} at Blocks`);
            return (
              <div key={idx}>
                &#123;blocks: err: {c.nodeType} not implemented in{" "}
                {content.nodeType}&#125;
              </div>
            );
        }
      })}
    </div>
  );
}
