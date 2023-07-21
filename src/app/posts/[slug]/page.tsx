import PostBody from "@/components/post/body";
import { getPosts } from "@/utils/contentful/client";
import { notFound } from "next/navigation";

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
  const post = await getPosts(params.slug);
  if (post.length <= 0) {
    return {
      title: "Ziprawan - Not Found",
      description: `Requested page (${params.slug}) is not found`,
    };
  }

  return {
    title: post[0].fields.title,
    description: post[0].fields.excerpt,
  };
}

export default async function PostSlug({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPosts(params.slug);

  if (post.length <= 0) {
    notFound();
  }

  return (
    <div>
      <PostBody post={post[0]} />
    </div>
  );
}
