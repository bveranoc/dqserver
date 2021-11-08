import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import User from "../models/User";
import config from "../config";

export const verifyToken: RequestHandler = async (req, res, next) => {
  try {
    const token = req.get("x-access-token");

    if (!token) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    if (typeof decoded !== "object") {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }
};
