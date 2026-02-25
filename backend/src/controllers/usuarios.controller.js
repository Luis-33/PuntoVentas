import {pool} from "../config/db.js"

export const getUser = async(req, res) => {//usando los metodos de Router (request y response)
    const {rows} = await pool.query('SELECT * FROM usuarios');
    
    res.json(rows)
}

export const getUserByid = async (req, res) => {
    const {id_usuario} = req.params;
    const {rows} = await pool.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id_usuario]);

    if (rows.length === 0){
        return res.status(404).json({mensaje: "Usuario no encontrado"})
    } 
    res.json(rows);
}

export const deleteUser = async (req, res) => {
    const {id_usuario} = req.params;
    const {rows, rowCount} = await pool.query('DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *', [id_usuario]);
    console.log(rows)

    if (rowCount === 0){
        return res.status(404).json({mensaje: "Usuario no encontrado"});
    }
    return res.sendStatus(204)
}

export const createUser = async (req, res) => {//usando los metodos de Router (request y response)
   try {
    const data = req.body
    const {rows} = await pool.query(
    "INSERT INTO usuarios (nombre_usuario, correo, numero_telefonico, contraseña, foto_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [data.nombre_usuario, data.correo, data.numero_telefonico, data.contraseña, data.foto_url]
    )
    return res.json(rows[0]);
   } catch (error) {
    console.log(error);
    if (error?.code === "23505") {
        return res.status(409).json({mensaje: "El correo ya existe"});
    }

    return res.status(500).json({mensaje: "Error interno"})
    
   }

}

export const updateUser = async (req, res) => {//usando los metodos de Router (request y response)
    const {id_usuario} = req.params;
    const data = req.body;

    const {rows} = await pool.query(
        "UPDATE usuarios SET nombre_usuario = $1, correo = $2, numero_telefonico = $3, contraseña = $4, foto_url = $5 WHERE id_usuario = $6 RETURNING *",
        [data.nombre_usuario, data.correo, data.numero_telefonico, data.contraseña, data.foto_url, id_usuario]
    );
    return res.json(rows[0]);
}