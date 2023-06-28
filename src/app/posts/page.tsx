import PostCard from "@/components/post/card";
import { getPosts } from "@/utils/contentful/client";

export const metadata = {
  title: "Post Lists"
}

export default async function Home() {
  const items = await getPosts();

  return (
    <main>
      <div className="post-text text-4xl text-center font-serif font-bold my-6">
        My posts
      </div>
      <hr />
      <div className="post-card mx-6 my-4">
        {items.map((item) => (
          <PostCard key={item.fields.slug} field={item.fields} />
        ))}
      </div>
    </main>
  );
}
