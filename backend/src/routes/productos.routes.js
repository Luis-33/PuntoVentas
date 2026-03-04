import { Router } from "express";
import { createProdu, deleteProdu, getProdu, getProduById, updateProdu } from '../controllers/productos.controller.js'

const router = Router()

router.get('/productos',getProdu);

router.get('/productos/:id_producto',getProduById);

router.post('/productos',createProdu);

router.delete('/productos/:id_producto',deleteProdu);

router.put('/productos/:id_producto',updateProdu);

export default router;