import mongoose, { connect } from "mongoose";

let db: typeof mongoose;

export const connectToDb = async () => {
  try {
    const mongoDbUri = process.env["MONGO_URI"];
    if (!mongoDbUri) {
      throw new Error("MONGO_URI is not configured");
    }

    if (db) {
      console.log("Using existing connection");
      return;
    }

    db = await connect(mongoDbUri);
  } catch (e) {
    console.error("Error connecting to mongodb", e);
    throw e;
  }
};
