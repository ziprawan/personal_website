import { Asset, ChainModifiers, EntrySys, Metadata } from "contentful";
import { TypeAuthor } from "./TypeAuthor";
import { Document, TOP_LEVEL_BLOCKS } from "@contentful/rich-text-types";

export type TypePost = {
  metadata: Metadata;
  sys: EntrySys & {
    contentType: {
      sys: {
        id: "post";
      };
    };
  };
  fields: {
    title: string;
    slug: string;
    excerpt: string;
    coverImage: Asset<"WITHOUT_UNRESOLVABLE_LINKS">;
    author: TypeAuthor;
    date: string;
    content: Document;
  };
};
