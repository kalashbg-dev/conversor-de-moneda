import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import Conversion from "../models/Conversion";
import { conversionSchema } from "../validators/conversionValidator";
import { logConversion } from "../controllers/conversionController";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();

router.post("/convert", authMiddleware, validateRequest(conversionSchema), logConversion);
export default router;