CREATE TABLE usuarios(
	id_usuario SERIAL PRIMARY KEY,
	nombre_usuario varchar(50) NOTNULL,
	numero_telefonico int(10),
	correo varchar(100) UNIQUE NOTNULL,
	contrasena TEXT NOTNULL,
	foto_usuario varchar(255),
);

CREATE TABLE proveedores(
	id_provedor SERIAL PRIMARY KEY,
	nombre_empresa VARCHAR(100) NOTNULL,
	nombre_contacto VARCHAR(50),
	correo VARCHAR(100) UNIQUE NOTNULL,
	numero_telefonico INT(10),
	direccion VARCHAR(50) NOTNULL,
);

CREATE TABLE productos(
	id_producto SERIAL PRIMARY KEY,
	nombre_producto VARCHAR(50),
	precio_compra NUMERIC(10,2),
	precio_venta NUMERIC(10,2),
	fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	id_proveedor INT NOT NULL,
	CONSTRAINT fk_proveedor
	FOREIGN KEY (id_proveedor)
	REFERENCES proveedores(id_proveedor)
	ON DELETE RESTRICT
);

CREATE TABLE inventario(
	id_inventario SERIAL PRIMARY KEY,
	tipo 
);