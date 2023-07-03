import { BLOCKS, INLINES, TopLevelBlock } from "@contentful/rich-text-types";
import markers from "./marks";
import Link from "next/link";
import { TypePost } from "@/types/content-type/TypePost";

export default function Blocks({ content }: { content: TopLevelBlock }) {
  return (
    <div className="whitespace-pre-wrap">
      {content.content.map((c, idx) => {
        switch (c.nodeType) {
          case "text":
            return markers(c, idx);
          case BLOCKS.PARAGRAPH:
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
            return (
              <a
                key={idx}
                href={c.data.uri as string}
                className="transition-colors duration-300 text-blue-500 text- hover:text-blue-800 hover:underline"
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
            return (
              <Link
                key={idx}
                href={`/posts/${(c.data.target as TypePost).fields.slug}`}
                className="transition-colors duration-300 text-blue-500 text- hover:text-blue-800 hover:underline"
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
