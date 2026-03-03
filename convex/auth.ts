import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex, crossDomain } from "@convex-dev/better-auth/plugins";
import { components } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";
import { query } from "./_generated/server";
import { betterAuth } from "better-auth/minimal";
import authConfig from "./auth.config";

const siteUrl = process.env.SITE_URL!;

// The component client has methods needed for integrating Convex with Better Auth,
// as well as helper methods for general use.
export const authComponent = createClient<DataModel>(components.betterAuth);

export const createAuth = (ctx: GenericCtx<DataModel>) => {
  return betterAuth({
    trustedOrigins: [siteUrl, "http://localhost:5173"],
    database: authComponent.adapter(ctx),
    // Email + password
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    // Social login
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT!,
        clientSecret: process.env.GOOGLE_SECRET!,
      },
    },
    plugins: [
      crossDomain({ siteUrl }),
      convex({ authConfig }),
    ],
  });
}

// Example function for getting the current user
// Feel free to edit, omit, etc.
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    return authComponent.getAuthUser(ctx);
  },
});