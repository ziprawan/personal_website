import connect from "@/database/client";
import RedirectModel from "@/database/schemas/redirect";
import checkRequiredEnvironments from "@/utils/server/checkReqEnv";
import sendResponse from "@/utils/server/send";
import randomString from "@/utils/tools/random";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  if (!checkRequiredEnvironments(["GOOGLE_ID", "GOOGLE_SECRET", "AUTH_URL"])) {
    return NextResponse.json({
      ok: false,
      description:
        "Internal server error. If you're the owner of this website, please check error logs.",
    });
  }

  try {
    const url = new URL(request.url);
    const params = url.searchParams;

    const provider = params.get("provider");
    const redirect_uri = params.get("redirect_uri");

    await connect();
    const found = await RedirectModel.findOne({
      name: new URL(redirect_uri!).origin,
    });
    if (!found) {
      return sendResponse("Redirect uri mismatch.", 401);
    }

    if (!provider || provider !== "google" || !redirect_uri) {
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

    const baseUrl = new URL("https:/accounts.google.com/o/oauth2/v2/auth");
    baseUrl.searchParams.set("scope", "openid email profile");
    baseUrl.searchParams.set("client_id", process.env.GOOGLE_ID!);
    baseUrl.searchParams.set("response_type", "code");
    baseUrl.searchParams.set(
      "redirect_uri",
      process.env.AUTH_URL + "/api/auth/callback/google"
    );
    baseUrl.searchParams.set(
      "state",
      btoa(
        String.fromCodePoint(
          ...new TextEncoder().encode(redirect_uri + "_" + randomString(16))
        )
      )
    );

    return NextResponse.redirect(baseUrl);
  } catch (err) {
    console.log(err);
    if (err instanceof TypeError) return sendResponse("Invalid uri.", 400);
    else return sendResponse("Unknown error.", 500);
  }
}
