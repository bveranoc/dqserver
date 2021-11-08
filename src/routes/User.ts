import { Router } from "express";
import { body } from "express-validator";

// Controllers
import { authUser } from "../controllers/User";

const router = Router();

router.post(
  "/auth",
  body("firstName").notEmpty(),
  body("lastName").notEmpty(),
  body("email").notEmpty().isEmail(),
  body("socialProvider").isIn(["FACEBOOK", "GOOGLE"]),
  authUser
);

export default router;
