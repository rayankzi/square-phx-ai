import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const all = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    return await ctx.db.query("users").collect();
  },
});

export const getById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("users")
      .withIndex("by_id", (q) => q.eq("_id", userId))
      .unique();
  },
});

export const current = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    return await ctx.db
      .query("users")
      .withIndex("by_id", (q) => q.eq("_id", userId))
      .unique();
  },
});

export const verify = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const id = await getAuthUserId(ctx);
    if (!id) return null;

    const user = await ctx.runQuery(api.users.getById, { userId });
    if (!user) return null;

    await ctx.db.patch(user._id, {
      isVerifiedOnPlatform: !user.isVerifiedOnPlatform,
    });
  },
});

export const changeAdminStatus = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const id = await getAuthUserId(ctx);
    if (!id) return null;

    const user = await ctx.runQuery(api.users.getById, { userId });
    if (!user) return null;

    await ctx.db.patch(user._id, {
      isAdmin: !user.isAdmin,
    });
  },
});
