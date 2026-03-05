import { Router } from "express";//importando el modulo Router de express
import { crearUsuario, obtenerUsuarios, obtenerUsuarioPorId, actualizarUsuario, desactivarUsuario } from "../controllers/usuarios.controller.js";
const router = Router();//asignando una constante para utilizar Router
import { verifyToken } from "../middlewares/auth.middlewares.js";
router.post("/", verifyToken, crearUsuario);
router.get("/", verifyToken, obtenerUsuarios);
router.get("/:id", verifyToken, obtenerUsuarioPorId);
router.put("/:id", verifyToken, actualizarUsuario);
router.put("/desactivar/:id", verifyToken, desactivarUsuario);

export default router;