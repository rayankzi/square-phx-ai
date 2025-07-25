import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const create = mutation({
  args: {
    chatId: v.id("chats"),
    uiId: v.string(),
    role: v.union(
      v.literal("user"),
      v.literal("system"),
      v.literal("assistant"),
      v.literal("data"),
    ),
    content: v.string(),
    createdAt: v.number(),
    parts: v.array(v.any()),
  },
  handler: async (ctx, { chatId, content, role, createdAt, parts, uiId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated/Unauthorized");

    return await ctx.db.insert("messages", {
      chatId,
      content,
      createdAt,
      role,
      parts,
      uiId,
    });
  },
});

export const getAllByChatId = query({
  args: { chatId: v.id("chats") },
  handler: async (ctx, { chatId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated/Unauthorized");

    return await ctx.db
      .query("messages")
      .withIndex("by_chat_id", (q) => q.eq("chatId", chatId))
      .collect();
  },
});
