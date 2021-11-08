import { RequestHandler } from "express";
import { validationResult } from "express-validator";

import Message from "../models/Message";
import User from "../models/User";

export const createMessage: RequestHandler = async (req, res) => {
  try {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Errores en ingreso de información.",
      });
    }

    const message = new Message(req.body);
    const user = await User.findById(req.userId);

    if (user.availableMessages <= 0) {
      return res.status(400).json({
        success: false,
        message: "No tienes más mensajes disponibles.",
      });
    }

    user.availableMessages--;
    await user.save();

    if (!message.isAnonymus) {
      message.sender = `${user.firstName} ${user.lastName}`;
    }
    await message.save();

    return res.status(201).json({ success: true });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Algo salió mal. Inténtalo de nuevo más tarde.",
    });
  }
};

export const getMessage: RequestHandler = async (req, res) => {
  try {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Errores en ingreso de información.",
      });
    }

    const id = req.params.id;
    const message = await Message.findById(id);

    if (!message || !message.isSent) {
      return res
        .status(404)
        .json({ success: false, message: "Mensaje no encontrado." });
    }

    res.json({ success: true, message });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Algo salió mal. Inténtalo de nuevo más tarde.",
    });
  }
};

export const getPendingCount: RequestHandler = async (req, res) => {
  try {
    const pendingMessages = await Message.count({ isSent: false });
    return res.send({
      success: true,
      pendingMessages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Algo salió mal. Inténtalo de nuevo más tarde.",
    });
  }
};
