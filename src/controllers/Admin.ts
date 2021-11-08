import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import config from "../config";
import Admin from "../models/Admin";

export const authAdmin: RequestHandler = async (req, res) => {
  try {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Errores en ingreso de información.",
      });
    }

    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Credenciales incorrectas",
      });
    }

    // Verify password
    const passwordIsCorrect = await bcrypt.compare(password, admin.password);
    if (!passwordIsCorrect) {
      return res.status(404).json({
        success: false,
        message: "Credenciales incorrectas",
      });
    }

    // Generate token
    const token = jwt.sign({ id: admin._id }, config.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });

    return res.status(200).json({
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

export const createAdmin: RequestHandler = async (req, res) => {
  try {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Errores en ingreso de información.",
      });
    }

    const usernameTaken = await Admin.findOne({ username: req.body.username });
    if (usernameTaken) {
      return res.status(400).json({
        success: false,
        message: "El nombre de usuario ya está en uso.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const admin = new Admin({
      username: req.body.username,
      password: hashedPassword,
    });

    await admin.save();

    return res.status(201).json({
      success: true,
      admin,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Algo salió mal. Inténtalo de nuevo más tarde.",
    });
  }
};
