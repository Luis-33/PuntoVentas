import { Router } from "express";//importando el modulo Router de express
import { createUser, deleteUser, getUser, getUserByid, updateUser } from "../controllers/usuarios.controller.js";
const router = Router();//asignando una constante para utilizar Router

router.get('/usuarios', getUser);
//GET
router.get('/usuarios/:id_usuario', getUserByid);
//DELETE
router.delete('/usuarios/:id_usuario', deleteUser);
//POST
router.post('/usuarios', createUser);
//PUT
router.put('/usuarios/:id_usuario', updateUser);

export default router;