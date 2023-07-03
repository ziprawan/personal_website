import { TopLevelBlock } from "@contentful/rich-text-types";

export function RichTextEmbedAsset({ contents }: { contents: TopLevelBlock }) {
  return (
    <div className="my-2 italic text-gray-500">
      Current nodeType: {contents.nodeType} isn&#39;t supported
    </div>
  );
}
