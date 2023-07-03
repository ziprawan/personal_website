import { Text } from "@contentful/rich-text-types";
import React from "react";

export default function markers(c: Text, idx: number) {
  if (c.nodeType !== "text") {
    console.error("Invalid");
    return <></>;
  }

  let length = c.marks.length;

  if (length === 0) return c.value;
  else {
    let current = <>{c.value}</>;
    // let current = "empty0";
    let i = 0;
    while (i < length) {
      const mark = c.marks[i].type;
      switch (mark) {
        case "bold":
          current = <b>{current}</b>;
          break;
        case "underline":
          current = <u>{current}</u>;
          break;
        case "italic":
          current = <i>{current}</i>;
          break;
        case "superscript":
          current = <sup>{current}</sup>;
          break;
        case "subscript":
          current = <sub>{current}</sub>;
          break;
        case "code":
          current = (
            <code className="p-1 bg-gray-400 rounded-md">{current}</code>
          );
        default:
          current = <>{current}</>;
          break;
      }
      i++;
    }
    return React.cloneElement(current, { key: idx });
  }
}
