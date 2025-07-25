import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.

export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    isAdmin: v.optional(v.boolean()),
    isVerifiedOnPlatform: v.optional(v.boolean()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
  })
    .index("email", ["email"])
    .index("phone", ["phone"]),
  chats: defineTable({
    userId: v.id("users"),
    title: v.string(),
    createdAt: v.number(),
    lastMessageAt: v.number(),
    isPinned: v.boolean(),
  }).index("by_user_id", ["userId"]),
  messages: defineTable({
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
  }).index("by_chat_id", ["chatId"]),
});
