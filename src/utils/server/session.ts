import { NextRequest } from "next/server";
import checkRequiredEnvironments from "./checkReqEnv";
import sendResponse from "./send";
import { base64url, jwtDecrypt } from "jose";
import connect from "@/database/client";
import GoogleModel from "@/database/schemas/google";

type PayloadUser = {
  id: string;
  name: string;
  email: string;
  picture: string;
  locale: string;
  exp: number;
  username?: string;
};

export default async function getSession(request: NextRequest) {
  if (!checkRequiredEnvironments(["AUTH_SECRET"])) {
    return sendResponse("Internal server error", 500);
  }

  const headers = request.headers;

  if (!headers.get("Authorization")) {
    return sendResponse("Bad Request", 400);
  }

  const authorization = headers.get("Authorization");

  if (typeof authorization !== "string") {
    return sendResponse("Bad Request", 400);
  }

  if (!authorization.startsWith("Bearer ")) {
    return sendResponse("Bad Request.", 400);
  }

  const token = authorization.split("Bearer ")[1];

  // Try decrypt token
  try {
    const res = await jwtDecrypt(
      token,
      base64url.decode(process.env.AUTH_SECRET!.slice(0, 43))
    );

    const payload = res.payload as PayloadUser;

    await connect();
    const found = await GoogleModel.findOne({
      id: payload.id,
    });

    if (!found) return sendResponse("Account not found.", 404);
    const { exp } = payload;
    const { id, name, email, picture, locale } = found;

    return {
      id,
      name,
      email,
      picture,
      locale,
      exp,
      username: found.username,
    };
  } catch {
    return sendResponse("Invalid token.", 401);
  }
}
