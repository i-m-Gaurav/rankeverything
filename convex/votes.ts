import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getLeaderboard = query({
  args: { categoryId: v.id("categories") },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("items")
      .withIndex("by_category", (q) => q.eq("categoryId", args.categoryId))
      .collect();

    const votes = await ctx.db
      .query("votes")
      .withIndex("by_category", (q) => q.eq("categoryId", args.categoryId))
      .collect();

    // Calculate net score (upvotes - downvotes)
    const voteCounts: Record<string, { up: number; down: number }> = {};
    for (const item of items) {
      voteCounts[item._id] = { up: 0, down: 0 };
    }

    for (const vote of votes) {
      if (voteCounts[vote.itemId]) {
        if (vote.value > 0) {
          voteCounts[vote.itemId].up += 1;
        } else {
          voteCounts[vote.itemId].down += 1;
        }
      }
    }

    const scored = items.map((item) => ({
      ...item,
      upvotes: voteCounts[item._id]?.up ?? 0,
      downvotes: voteCounts[item._id]?.down ?? 0,
      score: (voteCounts[item._id]?.up ?? 0) - (voteCounts[item._id]?.down ?? 0),
    }));

    scored.sort((a, b) => b.score - a.score);

    return scored;
  },
});

export const castVote = mutation({
  args: {
    itemId: v.id("items"),
    categoryId: v.id("categories"),
    value: v.number(), // +1 or -1
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("You must be logged in to vote");
    }

    const userId = identity.subject;

    const existingVote = await ctx.db
      .query("votes")
      .withIndex("by_user_and_item", (q) =>
        q.eq("userId", userId).eq("itemId", args.itemId)
      )
      .unique();

    if (existingVote) {
      if (existingVote.value === args.value) {
        // Same vote again = remove vote (toggle off)
        await ctx.db.delete(existingVote._id);
        return { success: true, message: "Vote removed" };
      } else {
        // Different vote = update
        await ctx.db.patch(existingVote._id, { value: args.value });
        return { success: true, message: "Vote updated" };
      }
    } else {
      await ctx.db.insert("votes", {
        userId,
        itemId: args.itemId,
        categoryId: args.categoryId,
        value: args.value,
      });
      return { success: true, message: "Vote cast" };
    }
  },
});

// Get the user's votes for a category
export const getUserVotes = query({
  args: { categoryId: v.id("categories") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return {};

    const votes = await ctx.db
      .query("votes")
      .withIndex("by_category", (q) => q.eq("categoryId", args.categoryId))
      .collect();

    const userVotes: Record<string, number> = {};
    for (const vote of votes) {
      if (vote.userId === identity.subject) {
        userVotes[vote.itemId] = vote.value;
      }
    }
    return userVotes;
  },
});
