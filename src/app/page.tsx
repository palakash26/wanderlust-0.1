// // @ts-ignore
// const options = {
//   afterSignOutUrl: "/sign-in",
//   // other options
// };

import { connectMongoDB } from "@/config/db";
// import { UserType } from "@/interfaces";
import { GetCurrentUserFromMongoDB } from "@/server-actions/users";
import RoomsData from "./_common/rooms-data";
import { Suspense } from "react";
import Spinner from "@/components/spinner";
import Filters from "./_common/filters";
// import { UserButton } from "@clerk/nextjs";

connectMongoDB();

export default async function Home({ searchParams }: { searchParams: any }) {
  await GetCurrentUserFromMongoDB();

  const supenseKey = JSON.stringify(searchParams);
  console.log(searchParams);

  return (
    <div className="mb-5">
      <Filters searchParams={searchParams} />
      <Suspense fallback={<Spinner fullHeight />} key={supenseKey}>
        <RoomsData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

// // Initialize variables
// let mongoUserId = "";
// let clerkUserId = "";
// let name = "";
// let email = "";

// try {
//   const response: any = await GetCurrentUserFromMongoDB();

//   if (response.success && response.data) {
//     const mongoUser: UserType = response.data;
//     mongoUserId = mongoUser._id;
//     clerkUserId = mongoUser.clerkUserId;
//     name = mongoUser.name || "";
//     email = mongoUser.email || "";
//   } else {
//     // If the user is not found, handle it gracefully
//     console.error("User not found. Redirecting to sign-in page.");
//     return (
//       <div className="flex flex-col items-center gap-5 justify-center h-screen">
//         <h1 className="text-3xl text-red-500">User not found</h1>
//         <a href="/sign-in">Go to Sign In</a>
//       </div>
//     );
//   }
// } catch (error) {
//   console.error("An error occurred:", error);
//   return (
//     <div className="flex flex-col items-center gap-5 justify-center h-screen">
//       <h1 className="text-3xl text-red-500">An error occurred</h1>
//     </div>
//   );
// }
