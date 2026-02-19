import { Router } from "express";//importando el modulo Router de express
const router = Router();//asignando una constante para utilizar Router
import {pool} from "../config/db.js"
import { getProv, getProvByid, deleteProv, createProv, updateProv } from "../controllers/proveedores.controller.js";
//C-reate
//R-ead
//U-pdate
//D-elete
router.get('/proveedores', getProv);
//GET
router.get('/proveedores/:id_proveedor', getProvByid);
//DELETE
router.delete('/proveedores/:id_proveedor', deleteProv);
//POST
router.post('/proveedores', createProv);

router.put('/proveedores/:id_proveedor', updateProv);

export default router;//esportamos router como default
