import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";

export const authUser: RequestHandler = async (req, res) => {
  try {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Errores en ingreso de información.",
      });
    }

    // Verify if user exists or not
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      user = new User(req.body);
      await user.save();
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });

    return res.status(201).json({
      success: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Algo salió mal. Inténtalo de nuevo más tarde.",
    });
  }
};
