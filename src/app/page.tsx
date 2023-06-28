import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>Welcome to my burik website!</div>
      <Link href={"/posts"}>Click here!</Link>
    </main>
  );
}
