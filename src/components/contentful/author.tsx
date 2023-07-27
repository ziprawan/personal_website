import { TypeAuthor } from "@/types/content-type/TypeAuthor";
import ContentfulImage from "./image";
import { AssetFile } from "contentful";

type ContentfulAuthorProps = {
  name: TypeAuthor["fields"]["name"];
  photo: TypeAuthor["fields"]["picture"]["fields"];
  className?: string | undefined;
};

export default function ContentfulAuthor({
  name,
  photo,
  className,
}: ContentfulAuthorProps) {
  const image = photo.file as AssetFile;

  return (
    <div className={`flex ${className}`}>
      <ContentfulImage
        src={image.url}
        alt={photo.description ?? ""}
        width={image.details.image?.width}
        height={image.details.image?.height}
        className={`object-cover w-6`}
      />
      <div className="ml-2">{name}</div>
    </div>
  );
}
