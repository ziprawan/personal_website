import { NextRequest, NextResponse } from "next/server";
import RedirectModel from "@/database/schemas/redirect";
import connect from "@/database/client";
import sendResponse from "@/utils/server/send";
import checkRequiredEnvironments from "@/utils/server/checkReqEnv";

export async function GET(req: NextRequest) {
  if (!checkRequiredEnvironments(["AUTH_SECRET"])) {
    console.log("env missing.");
    return NextResponse.redirect(new URL(req.url).origin);
  }

  const headers = req.headers;

  if (!headers.get("authorization")) {
    console.log("auth missing.");
    return NextResponse.redirect(new URL(req.url).origin);
  }

  const authorization = headers.get("authorization") as string;

  if (!authorization.startsWith("Bearer ")) {
    console.log("auth format error.");
    return NextResponse.redirect(new URL(req.url).origin);
  }

  const token = authorization.split("Bearer ")[1];
  if (token !== process.env.AUTH_SECRET) {
    console.log("token mismatch.");
    return NextResponse.redirect(new URL(req.url).origin);
  }

  await connect();
  const allowed_origins = (
    await RedirectModel.find({}).select("name -_id")
  ).map((obj) => {
    return obj.name;
  });
  return sendResponse(allowed_origins);
}
