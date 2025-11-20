import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.DATABASE_URL || "mongodb://localhost:27017/lawyer_website"
    );
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Error in conecting database");
  }
};
export default connectDB;
