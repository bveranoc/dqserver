import { Router } from "express";

import { body, param } from "express-validator";

// Controllers
import {
  createMessage,
  getMessage,
  getPendingCount,
} from "../controllers/Message";

// Middlewares
import { verifyToken } from "../middleware/authentication";

const router = Router();

router.post(
  "/",
  body("body").notEmpty(),
  body("destinatary").notEmpty().isEmail(),
  body("bgColor").isHexColor(),
  body("textColor").isHexColor(),
  body("isAnonymus").isBoolean(),
  body("sendingDate").isDate(),
  verifyToken,
  createMessage
);

router.get("/display/:id", param("id").isMongoId(), getMessage);

router.get("/pending", getPendingCount);

export default router;
