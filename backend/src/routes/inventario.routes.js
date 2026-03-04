
import { Router } from "express";
import { createInvent, delteteInvent, getInvent, getInventById, updateInvent } from '../controllers/inventario.controller.js';

const router = Router();

router.get('/inventario',getInvent);
router.get('/inventario/:id_inventario',getInventById);
router.put('/inventario',createInvent);
router.delete('/inventario:id_inventario',delteteInvent);
router.put('/inventario:id_inventario',updateInvent);

export default router;