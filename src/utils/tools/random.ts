import crypto from "crypto";

export default function randomString(length: number = 0): string {
  const size = Math.ceil(length / 2);
  const random = crypto.randomBytes(size).toString("hex");

  return random.slice(0, length);
}
