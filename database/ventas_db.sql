-- =========================
-- PROVEEDORES
-- =========================
CREATE TABLE proveedores (
    id_proveedor SERIAL PRIMARY KEY,
    nombre_empresa VARCHAR(100) NOT NULL,
    nombre_contacto VARCHAR(50),
    correo VARCHAR(100) UNIQUE,
    numero_telefonico VARCHAR(20),
    direccion TEXT
);

-- =========================
-- ENUMS
-- =========================
CREATE TYPE rol_usuario AS ENUM ('admin', 'vendedor');
CREATE TYPE estado_usuario AS ENUM ('activo', 'inactivo');
CREATE TYPE estado_venta AS ENUM ('completada', 'cancelada');
CREATE TYPE tipo_movimiento AS ENUM ('entrada', 'salida', 'ajuste');

-- =========================
-- USUARIOS
-- =========================
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    numero_telefonico VARCHAR(20),
    password_hash TEXT NOT NULL,
    foto_url VARCHAR(255),
    rol rol_usuario NOT NULL DEFAULT 'vendedor',
    estado estado_usuario NOT NULL DEFAULT 'activo',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- PRODUCTOS
-- =========================
CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    nombre_producto VARCHAR(100) NOT NULL,
    precio_compra NUMERIC(10,2) NOT NULL CHECK (precio_compra >= 0),
    precio_venta NUMERIC(10,2) NOT NULL CHECK (precio_venta >= 0),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_proveedor INT NOT NULL REFERENCES proveedores(id_proveedor) ON DELETE RESTRICT
);

-- =========================
-- VENTAS
-- =========================
CREATE TABLE ventas (
    id_venta SERIAL PRIMARY KEY,
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (total >= 0),
    estado estado_venta NOT NULL DEFAULT 'completada',
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario) ON DELETE RESTRICT
);

-- =========================
-- DETALLE DE VENTAS
-- =========================
CREATE TABLE detalle_ventas (
    id_detalle SERIAL PRIMARY KEY,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_unitario NUMERIC(10,2) NOT NULL CHECK (precio_unitario >= 0),
    subtotal NUMERIC(10,2) NOT NULL CHECK (subtotal >= 0),
    id_producto INT NOT NULL REFERENCES productos(id_producto) ON DELETE RESTRICT,
    id_venta INT NOT NULL REFERENCES ventas(id_venta) ON DELETE RESTRICT
);

-- =========================
-- INVENTARIO (MOVIMIENTOS)
-- =========================
CREATE TABLE inventario_movimientos (
    id_movimiento SERIAL PRIMARY KEY,
    tipo tipo_movimiento NOT NULL,
    cantidad INT NOT NULL,
    comentarios TEXT,
    fecha_movimiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_producto INT NOT NULL REFERENCES productos(id_producto) ON DELETE RESTRICT,
    id_usuario INT REFERENCES usuarios(id_usuario) -- quién hizo el movimiento
);

