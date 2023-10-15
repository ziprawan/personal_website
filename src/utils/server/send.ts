import APIResponse from "@/types/server/response";
import { NextResponse } from "next/server";

export default function sendResponse(
  response: any,
  status: number = 200,
  init: ResponseInit | null = null
) {
  let opt: ResponseInit = { status: status };
  if (init) opt = { ...opt, ...init };

  let body: APIResponse | null;
  if (status <= 299) body = { ok: true, message: response };
  else body = { ok: false, description: response };

  return NextResponse.json(body, opt);
}
