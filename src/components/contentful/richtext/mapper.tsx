import { BLOCKS, TopLevelBlock } from "@contentful/rich-text-types";
import Blocks from "./blocks";
import RichTextListItem from "./list-item";
import RichTextTable from "./table";
import { RichTextEmbedAsset, RichTextEmbedEntry } from "./embed";

export default function contentMapper(
  content: TopLevelBlock,
  darkMode: boolean,
  idx?: number
) {
  switch (content.nodeType) {
    case BLOCKS.PARAGRAPH:
      return <Blocks content={content} key={idx} />;
    case BLOCKS.HEADING_1: {
      return (
        <h1 key={idx}>
          <Blocks content={content} />
        </h1>
      );
    }
    case BLOCKS.HEADING_2: {
      return (
        <h2 key={idx}>
          <Blocks content={content} />
        </h2>
      );
    }
    case BLOCKS.HEADING_3: {
      return (
        <h3 key={idx}>
          <Blocks content={content} />
        </h3>
      );
    }
    case BLOCKS.HEADING_4: {
      return (
        <h4 key={idx}>
          <Blocks content={content} />
        </h4>
      );
    }
    case BLOCKS.HEADING_5: {
      BLOCKS.LIST_ITEM;
      return (
        <h5 key={idx}>
          <Blocks content={content} />
        </h5>
      );
    }
    case BLOCKS.HEADING_6: {
      return (
        <h6 key={idx}>
          <Blocks content={content} />
        </h6>
      );
    }
    case BLOCKS.HR: {
      return (
        <hr
          className={`hr border ${
            darkMode ? "border-slate-300" : "border-slate-950"
          }`}
          key={idx}
        />
      );
    }
    case BLOCKS.UL_LIST: {
      return (
        <ul className="ml-8 list-disc" key={idx}>
          <RichTextListItem content={content as TopLevelBlock} />
        </ul>
      );
    }
    case BLOCKS.OL_LIST: {
      return (
        <ol className="ml-8 list-decimal" key={idx}>
          <RichTextListItem content={content as TopLevelBlock} />
        </ol>
      );
    }
    case BLOCKS.QUOTE: {
      return (
        <blockquote
          key={idx}
          className={`border-l-4 duration-300 ${
            darkMode
              ? "border-slate-300 text-slate-300"
              : "border-gray-600 text-gray-600"
          } pl-4`}
        >
          <Blocks content={content} />
        </blockquote>
      );
    }
    case BLOCKS.TABLE:
      return <RichTextTable contents={content} key={idx} />;
    case BLOCKS.EMBEDDED_ASSET: {
      return <RichTextEmbedAsset key={idx} contents={content} />;
    }
    case BLOCKS.EMBEDDED_ENTRY: {
      return <RichTextEmbedEntry key={idx} contents={content} />;
    }
    default:
      console.warn(`Unknown nodeType: ${content.nodeType} at contentMapper`);
      return (
        <div key={idx} className="my-2 italic text-gray-500">
          Current nodeType: {content.nodeType} isn&#39;t supported
        </div>
      );
  }
}
