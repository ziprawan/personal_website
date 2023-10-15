import sendResponse from "@/utils/server/send";
import { NextRequest, NextResponse } from "next/server";
import getSession from "@/utils/server/session";
import GoogleModel, { TypeGoogle } from "@/database/schemas/google";

export async function GET(request: NextRequest) {
  const session = await getSession(request);

  if (session instanceof NextResponse) return session;
  else return sendResponse(session);
}

export async function POST(request: NextRequest) {
  const session = await getSession(request);

  if (session instanceof NextResponse) return session;

  const content_type = request.headers.get("Content-Type");

  if (content_type !== "application/json") {
    return sendResponse(`Content-Type not accepted: ${content_type}`, 400);
  }

  const body = (await request.json()) as TypeGoogle;

  if (Object.keys(body).length === 0) {
    return sendResponse("Empty body.", 400);
  }

  const found = await GoogleModel.findOne({
    id: session.id,
  });

  if (!found) return sendResponse("Nuh uh.", 500);

  const { name, username } = body;

  let update: { name: string | null; username: string | null } = {
    name: session.name,
    username: null,
  };

  if (name) update = { ...update, name };
  if (username) update = { ...update, username };

  await found.updateOne(update);

  const send = {
    id: found.id,
    name: update.name ?? found.name,
    username: update.username,
    locale: found.locale,
    picture: found.picture,
    exp: session.exp,
  };

  return sendResponse(send, 200);
}

export async function DELETE(request: NextRequest) {
  const session = await getSession(request);

  if (session instanceof NextResponse) return session;

  const found = await GoogleModel.findOne({ id: session.id });
  await found?.deleteOne();

  return sendResponse("Deleted.", 200);
}

async function other() {
  return sendResponse("Method not allowed.", 405);
}

export { other as PATCH };
