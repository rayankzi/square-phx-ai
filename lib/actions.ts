"use server";

import { api } from "@/convex/_generated/api";
import { fetchMutation } from "convex/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";

export async function pinChat(chatId: Id<"chats">) {
  const token = await convexAuthNextjsToken();
  await fetchMutation(api.chats.pinChat, { chatId }, { token });
  revalidatePath(`/chat/${chatId}`);
}

export async function unpinChat(chatId: Id<"chats">) {
  const token = await convexAuthNextjsToken();
  await fetchMutation(api.chats.unpinChat, { chatId }, { token });
  revalidatePath(`/chat/${chatId}`);
}

export async function deleteChat(chatId: Id<"chats">) {
  const token = await convexAuthNextjsToken();
  await fetchMutation(api.chats.del, { chatId }, { token });
  redirect("/chat");
}
