import {
  BLOCKS,
  INLINES,
  TopLevelBlock,
} from "@contentful/rich-text-types";
import markers from "./marks";
import Link from "next/link";
import { TypePost } from "@/types/content-type/TypePost";

export default function Blocks({ content }: { content: TopLevelBlock }) {
  return (
    <div className="whitespace-pre-wrap">
      {content.content.map((c) => {
        switch (c.nodeType) {
          case "text":
            return markers(c);
          case BLOCKS.PARAGRAPH:
            return c.content.map((paragraph) => {
              if (paragraph.nodeType === "text")
                return <p className="my-2">{markers(paragraph)}</p>;
              else
                return (
                  <>
                    &#123;err: paragraph: {paragraph.nodeType} not
                    implemented&#125;
                  </>
                );
            });
          case INLINES.HYPERLINK:
            // c.content.forEach((a, idx) => console.log(idx, a.nodeType))
            return (
              <a
                href={c.data.uri as string}
                className="transition-colors duration-300 text-blue-500 text- hover:text-blue-800 hover:underline"
                target="_blank"
              >
                {c.content.map((hyperlink) => {
                  if (hyperlink.nodeType === "text") {
                    return markers(hyperlink);
                  }
                  return (
                    <>
                      &#123;blocks: hyperlink: {hyperlink.nodeType} not
                      implemented&#125;
                    </>
                  );
                })}
              </a>
            );
          case INLINES.ENTRY_HYPERLINK:
            return (
              <Link
                href={`/posts/${(c.data.target as TypePost).fields.slug}`}
                className="transition-colors duration-300 text-blue-500 text- hover:text-blue-800 hover:underline"
              >
                {c.content.map((entryHyperlink) => {
                  if (entryHyperlink.nodeType === "text") {
                    return markers(entryHyperlink);
                  }
                  return (
                    <>
                      &#123;blocks: entry_hyperlink: ${entryHyperlink.nodeType}{" "}
                      not implemented
                    </>
                  );
                })}
              </Link>
            );
          default:
            console.warn(`Unknown nodeType: ${c.nodeType} at Blocks`);
            return (
              <>
                &#123;blocks: err: {c.nodeType} not implemented in{" "}
                {content.nodeType}&#125;
              </>
            );
        }
      })}
    </div>
  );
}
