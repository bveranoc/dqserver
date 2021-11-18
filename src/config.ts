import dotenv from "dotenv";
dotenv.config();

export default {
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/decirteque",
  PORT: process.env.PORT || 8000,
  JWT_SECRET: process.env.JWT_SECRET || "decirteque",
  SENDGRID_KEY: process.env.SENDGRID_KEY || "",
  SENDGRID_SENDER: process.env.SENDGRID_SENDER || "",
  SENDGRID_TEMPLATEID: process.env.SENDGRID_TEMPLATEID || "",
  WEB_URL: process.env.WEB_URL || "http://localhost:3000",
};
