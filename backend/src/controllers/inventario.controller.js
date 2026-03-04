import {pool} from '../config/db.js'
// GET
export const getInvent = async(req,res) =>{
    try {
        const {rows} = await pool.query('SELECT * FROM inventario');
    return res.json(rows)

    } catch (error) {
        console.log(error);
        return res.staus(500).json({mensaje:"Error interno"})
        
        
    }
    

}
//GET:ID
export const getInventById = async(req,res) =>{
res.json('obteniendo inventario')
}
//CREATE
export const createInvent = async(req,res) =>{
res.json('creando inventario')
    
}
//DELETE
export const delteteInvent = async(req,res) =>{
res.json('eliminando inventario')
    
}
//UPDATE
export const updateInvent = async(req,res) =>{
res.json('acrualizando inventario')
    
}