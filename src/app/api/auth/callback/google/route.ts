import checkRequiredEnvironments from "@/utils/server/checkReqEnv";
import { NextRequest, NextResponse } from "next/server";
import sendResponse from "@/utils/server/send";
import * as jose from "jose";
import connect from "@/database/client";
import RedirectModel from "@/database/schemas/redirect";
import GoogleModel from "@/database/schemas/google";

export async function GET(request: NextRequest) {
  if (
    !checkRequiredEnvironments([
      "GOOGLE_ID",
      "GOOGLE_SECRET",
      "AUTH_SECRET",
      "AUTH_URL",
    ])
  ) {
    return NextResponse.json({
      ok: false,
      description:
        "Internal server error. If you're the owner of this website, please check error logs.",
    });
  }

  await connect();

  const url = new URL(request.url);
  const params = url.searchParams;

  // Get needed parameters
  const state = params.get("state");
  const code = params.get("code");

  // Check state and code
  if (!state || !code) {
    return NextResponse.json(
      {
        ok: false,
        description: "Invalid request",
      },
      {
        status: 400,
      }
    );
  }

  // Get redirect uri
  const decoded = atob(state).split("_");
  console.log(decoded);
  if (decoded.length !== 2) {
    return NextResponse.json(
      {
        ok: false,
        description: "Invalid request",
      },
      {
        status: 400,
      }
    );
  }

  const redirect_uri = new URL(decoded[0]);
  const allowedUris = await RedirectModel.findOne({
    name: redirect_uri.origin,
  });

  if (!allowedUris) {
    return sendResponse("Redirect uri mismatch.", 401);
  }

  // Fetch access token
  const fields = [
    ["client_id", process.env.GOOGLE_ID],
    ["client_secret", process.env.GOOGLE_SECRET],
    ["code", code],
    ["grant_type", "authorization_code"],
    ["redirect_uri", `${process.env.AUTH_URL}/api/auth/callback/google`],
  ];
  const formBody = fields
    .map((field) => {
      const encodedKey = encodeURIComponent(field[0]!);
      const encodedValue = encodeURIComponent(field[1]!);
      return encodedKey + "=" + encodedValue;
    })
    .join("&");
  const fetch_token = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formBody,
  });
  const json_token = await fetch_token.json();

  if ("error" in json_token) {
    if (json_token.error === "redirect_uri_mismatch") {
      return NextResponse.json(
        {
          ok: false,
          description: "Redirect URI not allowed.",
        },
        { status: 400 }
      );
    } else if (json_token.error === "invalid_grant") {
      return NextResponse.json({
        ok: false,
        description: "Invalid grant, please try again.",
      });
    }
    return NextResponse.json(
      {
        ok: false,
        description: "Something went wrong when authenticating with google.",
      },
      { status: 417 }
    );
  }

  const access_token = json_token.access_token as String;

  // Get user info
  const fetch_info = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    }
  );
  const json_info: Record<string, string> = await fetch_info.json();

  if ("error" in json_info) {
    return sendResponse("Something went wrong when fethcing user info.", 417);
  }

  await connect();

  const { id, name, email, picture, locale } = json_info;
  const client = { id };

  const found = await GoogleModel.findOne({ id });
  if (!found) {
    const newUser = new GoogleModel({
      id,
      name,
      email,
      picture,
      locale,
      username: null,
    });
    await newUser.save();
  }

  // encrypt to jwt
  const secret = jose.base64url.decode(process.env.AUTH_SECRET!.slice(0, 43));
  const signed = await new jose.EncryptJWT(client)
    .setExpirationTime("7d")
    .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
    .encrypt(secret);

  redirect_uri.searchParams.append("access_token", signed);
  return NextResponse.redirect(redirect_uri);

  // return sendResponse({
  //   status: "authenticated",
  //   session_token: signed,
  //   redirect_uri,
  // });
}
