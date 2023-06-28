import PostBody from "@/components/post/body";
import { getPosts } from "@/utils/contentful/client";

export async function generateStaticParams() {
  const posts = await getPosts();
  const slugs: { slug: string }[] = [];
  posts.forEach((p) => {
    slugs.push({ slug: p.fields.slug });
  });
  return slugs;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const posts = await getPosts();
  const slugs: string[] = [];
  posts.forEach((p) => slugs.push(p.fields.slug));
  return {
    title: posts[slugs.indexOf(params.slug)].fields.title,
  };
}

export default async function PostSlug({
  params,
}: {
  params: { slug: string };
}) {
  const posts = await getPosts();
  const slugs: string[] = [];
  posts.forEach((p) => slugs.push(p.fields.slug));
  if (!slugs.includes(params.slug)) {
    return (
      <div className="items-center text-6xl font-bold">Post Not Found!</div>
    );
  }
  return (
    <div>
      <PostBody post={posts[slugs.indexOf(params.slug)]} />
    </div>
  );
}
