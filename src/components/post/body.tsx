import { TypePost } from "@/types/content-type/TypePost";
import ContentfulDate from "../contentful/date";
import ContentfulImage from "../contentful/image";
import { AssetFile } from "contentful";
import ContentfulRichText from "../contentful/richtext";

type params = {
  post: TypePost;
};

export default function PostBody({ post }: params) {
  const file = post.fields.coverImage.fields.file as AssetFile;
  return (
    <div className="container max-w-prose m-auto my-4 block border border-dashed border-slate-600">
      <div className="text-4xl font-bold p-4 border-b border-dashed border-slate-600">
        {post.fields.title}
      </div>
      <div className="a text-right p-4">
        <ContentfulDate date={post.fields.date} prefix="Posted at: " />
      </div>
      <div className="overflow-hidden border-b border-t border-dashed border-slate-600">
        <div className="p-4">
          <ContentfulImage
            alt={post.fields.coverImage.fields.description as string}
            src={file.url}
            width={file.details.image?.width}
            height={file.details.image?.height}
            className="rounded-lg mx-auto"
          />
        </div>
      </div>
      <div className="p-4">
        <ContentfulRichText content={post.fields.content} />
      </div>
    </div>
  );
}
