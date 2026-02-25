import { Router } from "express";//importando el modulo Router de express
import { getProv, getProvByid, deleteProv, createProv, updateProv } from "../controllers/proveedores.controller.js";
const router = Router();//asignando una constante para utilizar Router
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

export default router;//exportamos router como default
