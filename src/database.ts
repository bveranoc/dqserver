import mongoose, { ConnectOptions } from "mongoose";
import config from "./config";

(async () => {
  try {
    const db = await mongoose.connect(config.MONGO_URI);
    console.log("database connected to:", db.connection.name);
  } catch (error) {
    console.log(error);
  }
})();
