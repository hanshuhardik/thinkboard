import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongodb connect successfully");
  } catch (error) {
    console.error("mongodb connecting Error: ", error);
    process.exit(1); //exit with failure
  }
};
