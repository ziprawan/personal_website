import { BLOCKS, Document, TopLevelBlock } from "@contentful/rich-text-types";
import contentMapper from "./mapper";
import { writeFileSync } from "fs";

type params = {
  content: Document;
};

export default function ContentfulRichText({ content }: params) {
  const contents = content.content;
  // writeFileSync("another-post.json", JSON.stringify(content));
  return (
    <div>
      {contents.map((content, idx) => {
        return (
          <div key={idx} className="my-4">
            {contentMapper(content)}
          </div>
        );
      })}
    </div>
  );
}
