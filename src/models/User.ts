import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    availableMessages: { type: Number, required: true, default: 5 },
    socialProvider: {
      type: String,
      required: true,
      enum: ["FACEBOOK", "GOOGLE"],
    },
  },
  { versionKey: false, timestamps: true }
);

export default model("User", userSchema);
