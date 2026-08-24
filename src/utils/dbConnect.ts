import { connectMongoDB } from "@/config/db";

const dbConnect = async () => {
  return await connectMongoDB();
};

export default dbConnect;

