import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>Welcome to Aziz&#39;s website!</div>
      <div>
        <Link href={"/posts"}>Click here to go to post lists</Link>
      </div>
      <div>
        <Link href={"/tools/genshin"}>
          Click here to go to my genshin account info (WIP)
        </Link>
      </div>
    </main>
  );
}
