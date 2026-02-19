import express from 'express';//import es una palabra reservada que se utiliza para importar librerias, metodos, variables, frameworks
import {PORT} from './src/config/config.js';//importando el puerto 
import provRoutes from './src/routes/proveedores.routes.js';//importando los endpoints (rutas) de provedores
import morgan from 'morgan';

const app = express();//creacion de objeto app para usar metodos de express
app.use(morgan('dev'));
app.use(express.json());
app.use(provRoutes);//utilizando el metodo use para utilizar los endpoints de proveedores
app.listen(PORT);//utilizando el metodo listen para que el programa escuche el puerto asignado
console.log('Servidor escuchando en el puerto', PORT)//Imprimir en consola

