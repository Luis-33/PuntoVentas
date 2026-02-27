import { Router } from "express";
import { createProdu, getProdu, getProduById } from '../controllers/productos.controller.js'

const router = Router()

router.get('/productos',getProdu);

router.get('/productos/:id_producto',getProduById);

router.post('/productos',createProdu);

// router.delete('/productos/:id_producto');

// router.put('/productos/:id_producto');

export default router;