import { TopLevelBlock } from "@contentful/rich-text-types";
import PostCard from "@/components/post/card";
import ContentfulImage from "../image";

type Props = { contents: TopLevelBlock };

export function RichTextEmbedAsset({ contents }: Props) {
  type AssetType = {
    title: string;
    description?: string;
    file: any;
  };
  const fields = contents.data.target.fields as AssetType;
  const file = fields.file;
  const mimeType = file.contentType as string;

  if (mimeType.startsWith("image/")) {
    return (
      <div className="max-w-lg">
        <ContentfulImage
          alt={fields.description as string}
          src={file.url}
          width={file.details.image?.width}
          height={file.details.image?.height}
          className="rounded-lg mx-auto"
        />
      </div>
    );
  }

  return (
    <div className="my-2 italic text-gray-500">
      Current mimeType: {fields.file.contentType} isn&#39;t supported
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
