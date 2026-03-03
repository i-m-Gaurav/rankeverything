import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  categories: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    imageUrl: v.optional(v.string()),
    isFeatured: v.boolean(),
    isTrending: v.boolean(),
    isHated: v.optional(v.boolean()),
    createdBy: v.string(),
  })
    .index("by_slug", ["slug"])
    .index("by_featured", ["isFeatured"])
    .index("by_trending", ["isTrending"])
    .index("by_hated", ["isHated"]),

  items: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    categoryId: v.id("categories"),
    createdBy: v.string(),
  }).index("by_category", ["categoryId"]),

  votes: defineTable({
    userId: v.string(),
    itemId: v.id("items"),
    categoryId: v.id("categories"),
    value: v.optional(v.number()), // +1 upvote, -1 downvote
    rank: v.optional(v.number()), // legacy field
  })
    .index("by_item", ["itemId"])
    .index("by_category", ["categoryId"])
    .index("by_user_and_item", ["userId", "itemId"]),
});
