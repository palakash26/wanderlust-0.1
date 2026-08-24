import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    clerkUserId: {
      type: String,
      required: true,
      index: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isSubAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.models.users || mongoose.model("users", userSchema);
export default UserModel;

