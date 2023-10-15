import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const origin = new URL(req.url).origin;

  const fetched = await fetch(origin + "/api/auth/allowed_uri", {
    headers: {
      Authorization: "Bearer " + process.env.AUTH_SECRET!,
    },
  });
  const json = await fetched.json();
  const allowed_uris = json.message as string[];

  if (allowed_uris.includes(req.headers.get("origin")!)) {
    res.headers.append(
      "Access-Control-Allow-Origin",
      req.headers.get("origin")!
    );
  }

  res.headers.append("Access-Control-Allow-Credentials", "true");
  res.headers.append(
    "Access-Control-Allow-Methods",
    "GET,DELETE,PATCH,POST,PUT"
  );
  res.headers.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Authorization, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  return res;
}

export const config = {
  matcher: ["/api/:path*"],
};
