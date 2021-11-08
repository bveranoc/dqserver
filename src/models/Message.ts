import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    body: { type: String, required: true, trim: true },
    sender: { type: String, required: false, trim: true },
    destinatary: { type: String, required: true, trim: true },
    bgColor: { type: String, required: true, trim: true },
    textColor: { type: String, required: true, trim: true },
    isSent: { type: Boolean, default: false },
    isAnonymus: { type: Boolean, required: true },
    sendingDate: { type: Date, required: true },
  },
  { versionKey: false, timestamps: true }
);

export default model("Message", messageSchema);
