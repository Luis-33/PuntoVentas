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
    id_ventas SERIAL PRIMARY KEY,
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total NUMERIC(10,2) NOT NULL 0,
    id_usuario INT NOT NULL,
    CONSTRAINT fk_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
        ON DELETE RESTRICT
);

CREATE TABLE detalle_ventas(
    id_detalle_ventas SERIAL PRIMARY KEY,
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_detalle_ventas NUMERIC(10,2) NOT NULL,
    subtotal_ventas NUMERIC(10,2) NOT NULL,
    id_producto INT NOT NULL,
    CONSTRAINT fk_producto
        FOREIGN KEY (id_producto)
        REFERENCES productos(id_producto)
        ON DELETE RESTRICT
    id_ventas INT NOT NULL,
    CONSTRAINT fk_ventas
        FOREIGN KEY (id_ventas)
        REFERENCES ventas(id_ventas)
        ON DELETE RESTRICT
);

CREATE TABLE inventario(
    id_inventario SERIAL PRIMARY KEY,
    tipo VARCHAR(20) NOT NULL,
    cantidad_producto INT NOT NULL CHECK (cantidad_producto > 0),
    comentarios TEXT,
    fecha_inventario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_producto INT NOT NULL,
    CONSTRAINT fk_producto
        FOREIGN KEY (id_producto)
        REFERENCES productos(id_producto)
        ON DELETE RESTRICT
);

