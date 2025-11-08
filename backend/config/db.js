import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error.message);
        // Retry logic for production
        if (process.env.NODE_ENV === 'production') {
            console.log("Retrying connection in 5 seconds...");
            setTimeout(connectDb, 5000);
        }
    }
}

export default connectDb