import { BLOCKS, TopLevelBlock } from "@contentful/rich-text-types";
import contentMapper from "./mapper";

export default function RichTextListItem({
  content,
}: {
  content: TopLevelBlock;
}) {
  return content.content.map((cont) => {
    switch (cont.nodeType) {
      case BLOCKS.LIST_ITEM: {
        return (
          <li>
            {cont.content.map((c) => {
              return contentMapper(c as TopLevelBlock);
            })}
          </li>
        );
      }
      default: {
        return (
          <li>
            &#123;mapper: ul_list: unsupported nodeType: {cont.nodeType}
            &#125;
          </li>
        );
      }
    }
  });
}
