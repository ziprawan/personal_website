import { BLOCKS, TopLevelBlock } from "@contentful/rich-text-types";
import contentMapper from "./mapper";

export default function RichTextListItem({
  content,
}: {
  content: TopLevelBlock;
}) {
  return content.content.map((cont, idx) => {
    switch (cont.nodeType) {
      case BLOCKS.LIST_ITEM: {
        return (
          <li key={idx}>
            {cont.content.map((c, li_idx) => {
              return contentMapper(c as TopLevelBlock, li_idx);
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
