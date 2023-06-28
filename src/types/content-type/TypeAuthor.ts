import { Asset, ChainModifiers, EntrySys, Metadata } from "contentful";

export type TypeAuthor = {
  metadata: Metadata;
  sys: EntrySys & {
    contentType: {
      sys: {
        id: "author";
      };
    };
  };
  fields: {
    name: string;
    picture: Asset<ChainModifiers>
  };
};
