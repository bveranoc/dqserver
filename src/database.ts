import mongoose, { ConnectOptions } from "mongoose";
import config from "./config";

(async () => {
  try {
    const options: ConnectOptions = {
      // user: config.MONGO_USER,
      // pass: config.MONGO_PASSWORD,
    };
    const db = await mongoose.connect(
      `mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`,
      options
    );
    console.log("database connected to:", db.connection.name);
  } catch (error) {
    console.log(error);
  }
})();
