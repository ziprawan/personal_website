import { Document } from "@contentful/rich-text-types";
import contentMapper from "./mapper";

type params = {
  content: Document;
};

export default function ContentfulRichText({ content }: params) {
  const contents = content.content;
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
