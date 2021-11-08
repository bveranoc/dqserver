import { Schema, model } from "mongoose";

const adminSchema = new Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
  },
  { versionKey: false, timestamps: true }
);

export default model("Admin", adminSchema);
