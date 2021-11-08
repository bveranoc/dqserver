import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new Schema(
  {
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
  },
  { versionKey: false, timestamps: true }
);

adminSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export default model("Admin", adminSchema);
