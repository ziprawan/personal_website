import sendResponse from "@/utils/server/send";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {}

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);
  return sendResponse({
    ok: true,
    message: JSON.stringify(body),
  });
}
