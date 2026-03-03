import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Called from the frontend after login to sync user data to our users table
export const syncUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    provider: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const authId = identity.subject;

    // Check if user already exists
    const existing = await ctx.db
      .query("users")
      .withIndex("by_authId", (q) => q.eq("authId", authId))
      .unique();

    if (existing) {
      // Update existing user (name/image may change)
      await ctx.db.patch(existing._id, {
        name: args.name,
        email: args.email,
        image: args.image,
        provider: args.provider,
      });
      return existing._id;
    } else {
      // Create new user
      return await ctx.db.insert("users", {
        authId,
        name: args.name,
        email: args.email,
        image: args.image,
        provider: args.provider,
      });
    }
  },
});

// Get current logged-in user's profile from our users table
export const getMe = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return await ctx.db
      .query("users")
      .withIndex("by_authId", (q) => q.eq("authId", identity.subject))
      .unique();
  },
});

// Get all users (for admin or leaderboard purposes)
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});
