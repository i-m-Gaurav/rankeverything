import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("categories").order("desc").collect();
  },
});

export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("categories")
      .withIndex("by_featured", (q) => q.eq("isFeatured", true))
      .order("desc")
      .collect();
  },
});

export const getTrending = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("categories")
      .withIndex("by_trending", (q) => q.eq("isTrending", true))
      .order("desc")
      .collect();
  },
});

export const getHated = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("categories")
      .withIndex("by_hated", (q) => q.eq("isHated", true))
      .order("desc")
      .collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const category = await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    return category;
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    imageUrl: v.optional(v.string()),
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("You must be logged in to create a category");
    }

    return await ctx.db.insert("categories", {
      name: args.name,
      description: args.description,
      slug: args.slug,
      imageUrl: args.imageUrl,
      isFeatured: false,
      isTrending: false,
      isHated: false,
      createdBy: identity.subject,
    });
  },
});
