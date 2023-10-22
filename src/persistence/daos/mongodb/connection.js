import { connect } from "mongoose";
import config from "../../../config/config.js";

export const initMongoDB = async () => {
  try {
    await connect(config.MONGO_LOCAL_URL);
    console.log(`Connection to MongoDB successful`);
  } catch (error) {
    throw new Error(error.message);
  }
};
