async function getData() {
  console.log("Get data");
  const fetched = await fetch("https://enka.network/api/uid/857313418?info");
  return await fetched.json();
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
