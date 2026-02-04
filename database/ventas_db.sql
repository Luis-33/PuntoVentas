CREATE TABLE proveedores (
    id_proveedor SERIAL PRIMARY KEY,
    nombre_empresa VARCHAR(100) NOT NULL,
    nombre_contacto VARCHAR(50),
    correo VARCHAR(100) UNIQUE,
    numero_telefonico VARCHAR(20),
    direccion TEXT
);

CREATE TABLE usuarios(
    id_usuario SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL,
    correo  VARCHAR(100) UNIQUE NOT NULL,
    numero_telefonico VARCHAR(20),
    contraseña TEXT NOT NULL,
    foto_url VARCHAR(255)
);

CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    nombre_producto VARCHAR(100) NOT NULL,
    precio_compra NUMERIC(10,2) NOT NULL,
    precio_venta NUMERIC(10,2) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_proveedor INT NOT NULL,
    CONSTRAINT fk_proveedor
        FOREIGN KEY (id_proveedor)
        REFERENCES proveedores(id_proveedor)
        ON DELETE RESTRICT
);

CREATE TABLE ventas(
    
):