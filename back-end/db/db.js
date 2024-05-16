import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongodb database connected to ${db.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
