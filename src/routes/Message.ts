import { Router } from "express";

import { body, param } from "express-validator";

// Controllers
import {
  createMessage,
  getMessage,
  getPendingCount,
  sendMessages,
} from "../controllers/Message";

// Middlewares
import { verifyToken } from "../middleware/authentication";
import { verifyTokenAdmin } from "../middleware/authenticationadmin";

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
router.get("/pending", verifyTokenAdmin, getPendingCount);
router.post("/send", verifyTokenAdmin, sendMessages);

export default router;
