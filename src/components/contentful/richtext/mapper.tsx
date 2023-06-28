import { BLOCKS, TopLevelBlock } from "@contentful/rich-text-types";
import Blocks from "./blocks";
import RichTextListItem from "./list-item";

export default function contentMapper(content: TopLevelBlock) {
  switch (content.nodeType) {
    case BLOCKS.PARAGRAPH:
      return <Blocks content={content} />;
    case BLOCKS.HEADING_1: {
      return (
        <h1>
          <Blocks content={content} />
        </h1>
      );
    }
    case BLOCKS.HEADING_2: {
      return (
        <h2>
          <Blocks content={content} />
        </h2>
      );
    }
    case BLOCKS.HEADING_3: {
      return (
        <h3>
          <Blocks content={content} />
        </h3>
      );
    }
    case BLOCKS.HEADING_4: {
      return (
        <h4>
          <Blocks content={content} />
        </h4>
      );
    }
    case BLOCKS.HEADING_5: {
      BLOCKS.LIST_ITEM;
      return (
        <h5>
          <Blocks content={content} />
        </h5>
      );
    }
    case BLOCKS.HEADING_6: {
      return (
        <h6>
          <Blocks content={content} />
        </h6>
      );
    }
    case BLOCKS.HR: {
      return <hr className="hr border border-slate-950" />;
    }
    case BLOCKS.UL_LIST: {
      return (
        <ul className="ml-8 list-disc">
          <RichTextListItem content={content as TopLevelBlock} />
        </ul>
      );
    }
    case BLOCKS.OL_LIST: {
      return (
        <ol className="ml-8 list-decimal">
          <RichTextListItem content={content as TopLevelBlock} />
        </ol>
      );
    }
    case BLOCKS.QUOTE: {
      return (
        <blockquote className="b border-l-4 border-slate-950 pl-4">
          <Blocks content={content} />
        </blockquote>
      );
    }
    default:
      console.warn(`Unknown nodeType: ${content.nodeType} at contentMapper`);
      return (
        <div className="my-2 italic text-gray-500">
          Current nodeType: {content.nodeType} isn&#39;t supported
        </div>
      );
  }
}
