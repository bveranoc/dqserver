import dotenv from "dotenv";
dotenv.config();

export default {
  MONGO_DATABASE: process.env.MONGO_DATABASE || "decirteque",
  MONGO_USER: process.env.MONGO_USER || "admin",
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || "12345",
  MONGO_HOST: process.env.MONGO_HOST || "localhost",
  PORT: process.env.PORT || 8000,
  JWT_SECRET: process.env.JWT_SECRET || "decirteque",
  SENDGRID_KEY: process.env.SENDGRID_KEY || "",
  SENDGRID_SENDER: process.env.SENDGRID_SENDER || "",
  SENDGRID_TEMPLATEID: process.env.SENDGRID_TEMPLATEID || "",
  WEB_URL: process.env.WEB_URL || "http://localhost:3000",
};
