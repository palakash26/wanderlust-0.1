"use server";

import { currentUser } from "@clerk/nextjs/server";
import UserModel from "@/models/user-models";
import { connectMongoDB } from "@/config/db";
import { message } from "antd";
import { revalidatePath } from "next/cache";

connectMongoDB();

export const GetCurrentUserFromMongoDB = async () => {
  try {
    const currentUserFromClerk = await currentUser();

    if (!currentUserFromClerk) {
      return { success: false, message: "No current user found" };
    }

    // check if user exists in the database
    const user = await UserModel.findOne({
      clerkUserId: currentUserFromClerk?.id,
    });

    // if user does not exits in the database create a new user and return user data
    if (!user) {
      // Create a new user only if they do not already exist
      const newUser = new UserModel({
        name: `${currentUserFromClerk.firstName} ${currentUserFromClerk.lastName}`,
        clerkUserId: currentUserFromClerk.id,
        email: currentUserFromClerk.emailAddresses[0].emailAddress,
        profilePic: currentUserFromClerk.imageUrl,
        isAdmin: false,
        isActive: true,
      });
      await newUser.save();
    }
    return {
      success: true,
      data: JSON.parse(JSON.stringify(user)),
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
