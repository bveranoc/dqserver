import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import Admin from "../models/Admin";
import config from "../config";

export const verifyTokenAdmin: RequestHandler = async (req, res, next) => {
  try {
    const token = req.get("x-access-token");

    if (!token) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    if (typeof decoded !== "object") {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    req.adminId = decoded.id;

    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }
};
