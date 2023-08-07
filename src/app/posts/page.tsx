import PostCard from "@/components/post/card";
import { getPosts } from "@/utils/contentful/client";

export const revalidate = 3600;

export const metadata = {
  title: "Post Lists",
};

export default async function Home() {
  const items = await getPosts();

  return (
    <main>
      <div className="transition-all duration-300 post-text text-4xl text-center font-bold pb-4">
        My posts
      </div>
      <hr />
      <div className="post-card px-6 py-4">
        {items.map((item) => {
          return <PostCard key={item.fields.slug} field={item.fields} />;
        })}
      </div>
    </main>
  );
}
