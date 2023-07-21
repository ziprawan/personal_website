import { TopLevelBlock } from "@contentful/rich-text-types";
import PostCard from "@/components/post/card";

type Props = { contents: TopLevelBlock };

export function RichTextEmbedAsset({ contents }: Props) {
  return (
    <div className="my-2 italic text-gray-500">
      Current nodeType: {contents.nodeType} isn&#39;t supported
    </div>
  );
}

export function RichTextEmbedEntry({ contents }: Props) {
  return (
    <div>
      <PostCard
        field={contents.data.target.fields}
        shadow={false}
        noHover={true}
      />
    </div>
  );
}

export function RichTextEmbedEntryInline({ contents }: Props) {
  return (
    <div>
      <PostCard
        field={contents.data.target.fields}
        shadow={false}
        noHover={true}
      />
    </div>
  );
}
