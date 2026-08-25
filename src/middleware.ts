import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/ping(.*)",
  "/ping(.*)",
  "/book-room/(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};




// import { authMiddleware, getAuth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import UserModel from "@/models/user-models"; // Adjust import path as per your project
// import type { NextRequest } from "next/server";

// export default authMiddleware({
//   publicRoutes: [
//     "/sign-in",
//     "/sign-up",
//     "/", // Add other public routes here
//   ],
// });

// export const config = {
//   matcher: [
//     "/admin/:path*",
//     "/subadmin/:path*",
//     "/user/:path*",
//     "/(api|trpc)(.*)", // Match API routes
//   ],
// };

// // Additional Role-Based Middleware
// export async function middleware(req: NextRequest) {
//   const { userId } = getAuth(req);

//   if (!userId) {
//     return NextResponse.redirect(new URL("/sign-in", req.url));
//   }

//   const user = await UserModel.findOne({ clerkUserId: userId });

//   if (!user) {
//     return NextResponse.redirect(new URL("/sign-in", req.url));
//   }

//   const roleBasedPaths = {
//     admin: ["/admin", "/admin/users", "/admin/hotels", "/admin/rooms", "/admin/reports"],
//     subadmin: ["/subadmin", "/subadmin/rooms", "/subadmin/bookings"],
//     user: ["/user", "/user/profile", "/user/bookings"],
//   };

//   const currentPath = req.nextUrl.pathname;

//   if (user.isAdmin && !roleBasedPaths.admin.includes(currentPath)) {
//     return NextResponse.redirect(new URL("/admin", req.url));
//   }

//   if (user.isSubAdmin && !roleBasedPaths.subadmin.includes(currentPath)) {
//     return NextResponse.redirect(new URL("/subadmin", req.url));
//   }

//   if (!user.isAdmin && !user.isSubAdmin && !roleBasedPaths.user.includes(currentPath)) {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   return NextResponse.next();
// }
