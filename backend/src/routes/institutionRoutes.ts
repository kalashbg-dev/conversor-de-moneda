import { Router } from "express";
import {
  createInstitution,
  getAllInstitutions,
  getInstitutionById,
  updateInstitution,
  deleteInstitution,
} from "../controllers/institutionController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { Roles } from "../constants/roles";
// import { institutionSchema } from '../validators/institutionValidator';
import { validateRequest } from "../middleware/validateRequest";
import { institutionSchema } from "../validators/institutionValidator";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Institutions
 *   description: Gestión de instituciones
 */

// Rutas protegidas para crear, actualizar y eliminar instituciones
router.use(authMiddleware, roleMiddleware([Roles.ADMIN])); // Middleware para proteger las siguientes rutas

/**
 * @swagger
 * /institutions:
 *   get:
 *     summary: Obtener todas las instituciones
 *     tags: [Institutions]
 *     responses:
 *       200:
 *         description: Lista de todas las instituciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Institution'
 */

router.get("/", getAllInstitutions); // Acceso público para obtener todas las instituciones

/**
 * @swagger
 * /institutions/{id}:
 *   get:
 *     summary: Obtener una institución por ID
 *     tags: [Institutions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la institución
 *     responses:
 *       200:
 *         description: Institución encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Institution'
 *       404:
 *         description: Institución no encontrada
 */

router.get("/:id", getInstitutionById); // Acceso público para obtener una institución específica

/**
 * @swagger
 * /institutions:
 *   post:
 *     summary: Crear una nueva institución
 *     tags: [Institutions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Institution'
 *     responses:
 *       201:
 *         description: Institución creada
 *       409:
 *         description: La institución ya existe
 */

router.post("/", validateRequest(institutionSchema), createInstitution);

/**
 * @swagger
 * /institutions/{id}:
 *   put:
 *     summary: Actualizar una institución
 *     tags: [Institutions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la institución
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Institution'
 *     responses:
 *       200:
 *         description: Institución actualizada
 *       404:
 *         description: Institución no encontrada
 */

router.put("/:id", validateRequest(institutionSchema), updateInstitution);

/**
 * @swagger
 * /institutions/{id}:
 *   delete:
 *     summary: Eliminar una institución
 *     tags: [Institutions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la institución
 *     responses:
 *       204:
 *         description: Institución eliminada
 *       404:
 *         description: Institución no encontrada
 */

router.delete("/:id", deleteInstitution);

export default router;
