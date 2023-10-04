export async function GET(request: Request) {
  const url = new URL(request.url);
  console.log(url.searchParams.get("code"));
  return Response.json(request.body);
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  console.log(JSON.stringify(url));
  return Response.json(request.body);
}
