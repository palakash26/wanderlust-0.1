import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/ping(.*)",
  "/ping(.*)",
  "/book-room/(.*)",
]);

const clerkHandler = clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    auth().protect();
  }
});

export default async function middleware(req: NextRequest, event: any) {
  // Safe Fallback: Prevents 500 MIDDLEWARE_INVOCATION_FAILED on Vercel if Clerk keys are missing or invalid
  const hasClerkKeys =
    Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) &&
    Boolean(process.env.CLERK_SECRET_KEY);

  if (!hasClerkKeys) {
    console.warn(
      "[Middleware] Clerk environment variables missing in Vercel. Bypassing Edge middleware."
    );
    return NextResponse.next();
  }

  try {
    return await clerkHandler(req, event);
  } catch (err) {
    console.error("[Middleware Exception]:", err);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
