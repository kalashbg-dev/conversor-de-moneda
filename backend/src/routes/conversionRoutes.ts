import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import Conversion from "../models/Conversion";
import { logConversion } from "../controllers/conversionController";

const router = Router();

router.post("/convert", authMiddleware, logConversion);

export default router;