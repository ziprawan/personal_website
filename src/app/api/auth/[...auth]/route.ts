import sendResponse from "@/utils/server/send";

export async function GET() {
  return sendResponse({
    ok: true,
    message: "OK.",
  });
}
