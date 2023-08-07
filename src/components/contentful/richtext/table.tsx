"use client";

import { BLOCKS, TopLevelBlock } from "@contentful/rich-text-types";
import Blocks from "./blocks";
import { useContext } from "react";
import DarkModeContext, {
  DarkModeContextProps,
} from "@/context/darkmode/darkmode";

const className = "p-2 duration-300";

export default function RichTextTable({
  contents,
}: {
  contents: TopLevelBlock;
}) {
  const { darkMode } = useContext(DarkModeContext) as DarkModeContextProps;

  return (
    <div
      className={`rounded-lg overflow-hidden border ${
        darkMode ? "border-white" : "border-black"
      }`}
    >
      <table className="min-w-full table-auto">
        <tbody
          className={`divide-y ${darkMode ? "divide-white" : "divide-black"}`}
        >
          {contents.content.map((content, idx) => {
            switch (content.nodeType) {
              case BLOCKS.TABLE_ROW: {
                return (
                  <tr
                    key={idx}
                    className={`divide-x ${
                      darkMode ? "divide-white" : "divide-black"
                    }`}
                  >
                    {content.content.map((tableRow, t_idx) => {
                      const nodeType = tableRow.nodeType;
                      if (nodeType === BLOCKS.TABLE_HEADER_CELL) {
                        return (
                          <th
                            className={
                              className +
                              ` ${darkMode ? "bg-slate-900" : "bg-gray-400"}`
                            }
                            key={t_idx}
                          >
                            <Blocks content={tableRow as TopLevelBlock} />
                          </th>
                        );
                      } else if (nodeType === BLOCKS.TABLE_CELL) {
                        return (
                          <td
                            key={t_idx}
                            className={
                              className + ` ${darkMode && "bg-slate-800"}`
                            }
                          >
                            <Blocks content={tableRow as TopLevelBlock} />
                          </td>
                        );
                      } else {
                        console.warn(
                          `Unknwon nodeType: ${nodeType} at table_row`
                        );
                        return (
                          <div key={t_idx} className="italic text-gray-500">
                            &#123;err: Unknwon nodeType: {nodeType} at
                            table&#125;
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
                  <div key={idx} className="italic text-gray-500">
                    &#123;err: Unknwon nodeType: {content.nodeType} at
                    table&#125;
                  </div>
                );
              }
            }
          })}
        </tbody>
      </table>
    </div>
  );
}
