import * as logger from "@/utils/logger";

async function getData() {
  logger.debug("Get data");
  const fetched = await fetch("https://enka.network/api/uid/857313418?info", {
    headers: {
      "User-Agent": "Ziprawan-Web",
    },
    next: {
      revalidate: 3600,
    },
  });

  try {
    return await fetched.json();
  } catch (err) {
    return (err as Error).stack;
  }
}

export default async function GenshinPage() {
  const data = await getData();
  return (
    <>
      <div>This is my Genshin profile page</div>
      <div style={{ whiteSpace: "pre-line" }}>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </>
  );
}
