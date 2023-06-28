import { TypePost } from "@/types/content-type/TypePost";
import ContentfulImage from "../contentful/image";
import { AssetFile } from "contentful";
import ContentfulDate from "../contentful/date";
import Link from "next/link";

type postCardtype = {
  field: TypePost["fields"];
};

export default function PostCard({ field }: postCardtype) {
  const file = field.coverImage.fields.file as AssetFile;
  return (
    <Link href={`/posts/${field.slug}`}>
      <div className="flex bg-gray-100 transition-shadow shadow-md hover:shadow-xl font-sans my-4 outline outline-1 rounded-md overflow-hidden h-36 xl:h-48 duration-300">
        <div className="outline outline-1 w-1/3 xl:w-1/5 flex content-center bg-pink-50">
          <ContentfulImage
            src={file.url}
            alt={field.coverImage.fields.description ?? ""}
            width={file.details.image?.width}
            height={file.details.image?.height}
            className="object-cover hover:object-contain"
          />
        </div>
        <div className="px-4 py-2 w-2/3 xl:w-4/5">
          <div className="font-bold text-2xl">{field.title}</div>
          <ContentfulDate date={field.date} />
          <div className="text-sm text-slate-500 text-justify">
            {field.excerpt}
          </div>
        </div>
      </div>
    </Link>
  );
}
