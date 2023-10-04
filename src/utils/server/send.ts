import APIResponse from "@/types/server/response";
import { NextResponse } from "next/server";

export default function sendResponse(
  response: APIResponse,
  status: number = 200,
  init: ResponseInit | null = null
) {
  let opt: ResponseInit = { status: status };
  if (init) opt = { ...opt, ...init };
  return NextResponse.json(response, opt);
}
