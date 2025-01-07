import mongoose from 'mongoose';

const dbConnect = async () => {
    if (mongoose.connection.readyState === 1) {
        console.log("Already connected to MongoDB");
        return;
    }

    
    try {
        await mongoose.connect(process.env.DATABASE_URL || process.env.MONGO_URI || '');
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error("Could not connect to MongoDB");
    }
};

export default dbConnect;

