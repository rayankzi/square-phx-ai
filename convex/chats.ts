import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { getAuthUserId } from "@convex-dev/auth/server";

export const create = mutation({
  args: { title: v.string() },
  handler: async (ctx, { title }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated/Unauthorized");

    return await ctx.db.insert("chats", {
      title,
      userId,
      isPinned: false,
      createdAt: Date.now(),
      lastMessageAt: Date.now(),
    });
  },
});

export const getById = query({
  args: { id: v.id("chats") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated/Unauthorized");

    return await ctx.db.get(id);
  },
});

export const getAllCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated/Unauthorized");

    return await ctx.db
      .query("chats")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();
  },
});

export const del = mutation({
  args: { chatId: v.id("chats") },
  handler: async (ctx, { chatId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");

    const chat = await ctx.db.get(chatId);
    const user = await ctx.runQuery(api.users.current);
    if (!user || !chat) throw new Error("Unauthorized");

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_chat_id", (q) => q.eq("chatId", chatId))
      .collect();

    for (const message of messages) {
      await ctx.db.delete(message._id);
    }

    await ctx.db.delete(chatId);
  },
});

export const updateTitle = mutation({
  args: {
    chatId: v.id("chats"),
    title: v.string(),
  },
  handler: async (ctx, { chatId, title }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated/Unauthorized");

    return await ctx.db.patch(chatId, { title });
  },
});

export const updateLastMsgAt = mutation({
  args: { chatId: v.id("chats") },
  handler: async (ctx, { chatId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated/Unauthorized");

    return await ctx.db.patch(chatId, { lastMessageAt: Date.now() });
  },
});

export const pinChat = mutation({
  args: { chatId: v.id("chats") },
  handler: async (ctx, { chatId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated/Unauthorized");

    return await ctx.db.patch(chatId, { isPinned: true });
  },
});

export const unpinChat = mutation({
  args: { chatId: v.id("chats") },
  handler: async (ctx, { chatId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated/Unauthorized");

    return await ctx.db.patch(chatId, { isPinned: false });
  },
});
