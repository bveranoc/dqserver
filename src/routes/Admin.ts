import { Router } from "express";

import { body } from "express-validator";

// Controllers
import { authAdmin, createAdmin } from "../controllers/Admin";

const router = Router();

router.post(
  "/login",
  body("username").notEmpty(),
  body("password").notEmpty(),
  authAdmin
);
router.post(
  "/",
  body("username").notEmpty(),
  body("password").notEmpty(),
  createAdmin
);

export default router;
