import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
// import Conversion from "../models/Conversion";
import { conversionSchema } from "../validators/conversionValidator";
import { getConversionHistory, logConversion } from "../controllers/conversionController";
import { validateRequest } from "../middleware/validateRequest";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { Roles } from "../constants/roles";

const router = Router();

// Rutas de conversion
router.post("/convert", validateRequest(conversionSchema), logConversion);

// Ruta para obtener el historial de conversiones (solo para ADMIN)
router.use(authMiddleware, roleMiddleware([Roles.ADMIN||Roles.USER]));
router.get("/history", getConversionHistory);

export default router;