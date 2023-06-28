import { TypePost } from "@/types/content-type/TypePost";
import * as contentful from "contentful";
import { cache } from "react";

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  space: process.env.CONTENTFUL_SPACE_ID as string,
});

export const getPosts = cache(async (slug?: string | undefined) => {
  console.log("getPosts called.");
  let opt: contentful.EntriesQueries<contentful.EntrySkeletonType, undefined> =
    { content_type: "post" };
  if (slug) opt = { ...opt, "fields.slug": slug };
  const response = await client.getEntries(opt);
  const items: TypePost[] = response.items as any;
  return items;
});
