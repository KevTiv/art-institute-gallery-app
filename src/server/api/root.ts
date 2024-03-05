import { artRouter } from "@/server/api/routers/art-institute-chicago";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({,
  artInstituteOfChicago: artRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
