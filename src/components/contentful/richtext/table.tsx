import { BLOCKS, TopLevelBlock } from "@contentful/rich-text-types";
import Blocks from "./blocks";

const className = "p-2";

export default function RichTextTable({
  contents,
}: {
  contents: TopLevelBlock;
}) {
  return (
    <div className="rounded-lg overflow-hidden border border-black">
      <table className="min-w-full divide-y divide-black table-auto">
        {contents.content.map((content, idx) => {
          switch (content.nodeType) {
            case BLOCKS.TABLE_ROW: {
              return (
                <tr key={idx} className="divide-x divide-black">
                  {content.content.map((tableRow, t_idx) => {
                    const nodeType = tableRow.nodeType;
                    if (nodeType === BLOCKS.TABLE_HEADER_CELL) {
                      return (
                        <th className={className + " bg-gray-400"} key={t_idx}>
                          <Blocks content={tableRow as TopLevelBlock} />
                        </th>
                      );
                    } else if (nodeType === BLOCKS.TABLE_CELL) {
                      return (
                        <td key={t_idx} className={className}>
                          <Blocks content={tableRow as TopLevelBlock} />
                        </td>
                      );
                    } else {
                      console.warn(
                        `Unknwon nodeType: ${nodeType} at table_row`
                      );
                      return (
                        <div key={t_idx} className="italic text-gray-500">
                          &#123;err: Unknwon nodeType: {nodeType} at table&#125;
                        </div>
                      );
                    }
                  })}
                </tr>
              );
            }
            default: {
              console.warn(`Unknown nodeType: ${content.nodeType} at table`);
              return (
                <div className="italic text-gray-500">
                  &#123;err: Unknwon nodeType: {content.nodeType} at table&#125;
                </div>
              );
            }
          }
        })}
      </table>
    </div>
  );
}
