
import { Router } from "express";
import { registrarEntrada, obtenerStock, obtenerMovimientos,registrarAjuste} from '../controllers/inventario.controller.js';
import { verifyToken } from "../middlewares/auth.middlewares.js";
const router = Router();

router.post("/entrada", verifyToken, registrarEntrada);
router.post("/ajuste", verifyToken, registrarAjuste);

router.get("/stock/:id_producto", verifyToken, obtenerStock);
router.get("/movimientos/:id_producto", verifyToken, obtenerMovimientos);

export default router;