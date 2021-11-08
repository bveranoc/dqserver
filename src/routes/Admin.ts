import { Router } from "express";

// Controllers
import { authAdmin, createAdmin } from "../controllers/Admin";

const router = Router();

router.post("/login", authAdmin);
router.post("/", createAdmin);

export default router;
