"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import UserModel from "@/models/user-models";
import { connectMongoDB } from "@/config/db";

export const GetCurrentUserFromMongoDB = async () => {
  try {
    await connectMongoDB();
    const { userId } = await auth();

    if (!userId) {
      return { success: false, message: "No current user found" };
    }

    // Check if user exists in MongoDB using lean query (fastest)
    const user = await UserModel.findOne({ clerkUserId: userId }).lean();

    if (user) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(user)),
      };
    }

    // Only if user does not exist in DB yet, fetch full details from Clerk API
    const currentUserFromClerk = await currentUser();
    if (!currentUserFromClerk) {
      return { success: false, message: "No current user found in Clerk" };
    }

    const newUser = new UserModel({
      name: `${currentUserFromClerk.firstName || ""} ${currentUserFromClerk.lastName || ""}`.trim() || "User",
      clerkUserId: currentUserFromClerk.id,
      email: currentUserFromClerk.emailAddresses[0]?.emailAddress || "",
      profilePic: currentUserFromClerk.imageUrl || "",
      isAdmin: false,
      isSubAdmin: false,
      isActive: true,
    });
    await newUser.save();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newUser.toObject())),
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Error while fetching user data from MongoDB",
    };
  }
};


// export const UpdateUserRole = async (userId: string, isAdmin: boolean) => {
//   try {
//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return { success: false, message: "User not found" };
//     }
//     user.isAdmin = isAdmin;
//     await user.save();
//     revalidatePath("/admin/users");
//     return {
//       success: true,
//       message: "User role updated successfully",
//     };
//   } catch (error) {
//     return {
//       success: false,
//       error: error,
//       message: "Error while updating user role",
//     };
//   }
// };


// export const UpdateUserRole = async (userId: string, isAdmin: boolean, isSubAdmin: boolean) => {
//   try {
//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return { success: false, message: "User not found" };
//     }

//     user.isAdmin = isAdmin;
//     user.isSubAdmin = isSubAdmin;
//     await user.save();

//     // Revalidate paths for admin and subadmin views
//     revalidatePath("/admin/users");
//     revalidatePath("/subadmin/rooms");

//     return {
//       success: true,
//       message: "User role updated successfully",
//     };
//   } catch (error) {
//     return {
//       success: false,
//       error,
//       message: "Error while updating user role",
//     };
//   }
// };


export const UpdateUserRole = async (userId: string, role: string) => {
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return { success: false, message: "User not found" };
    }

    user.isAdmin = role === "admin";
    user.isSubAdmin = role === "subadmin";
    user.isActive = role === "user";

    await user.save();
    return {
      success: true,
      message: "User role updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      error,
      message: "Error while updating user role",
    };
  }
};
