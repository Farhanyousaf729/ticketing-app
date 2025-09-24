import {auth} from "@clerk/nextjs/server";
export function getUserAuth() {
  const { userId, sessionId } = auth();
  return { userId, sessionId };
}
