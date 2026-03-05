import {pool} from "../config/db.js";

/* =========================
   CREAR VENTA
========================= */
export const crearVenta = async (req, res) => {
  const client = await pool.connect();

  try {
    const { productos } = req.body;

    if (!productos || productos.length === 0) {
      return res.status(400).json({ error: "Debe incluir productos en la venta" });
    }

    await client.query("BEGIN");

    let total = 0;

    // 1️⃣ Insertar venta (temporalmente total 0)
    const ventaResult = await client.query(
      `INSERT INTO ventas (id_usuario)
       VALUES ($1)
       RETURNING *`,
      [req.user.id_usuario]
    );

    const venta = ventaResult.rows[0];

    // 2️⃣ Procesar cada producto
    for (const item of productos) {
      // Verificar stock actual
      const stockResult = await client.query(
        `SELECT COALESCE(SUM(cantidad),0) AS stock
         FROM inventario_movimientos
         WHERE id_producto = $1`,
        [item.id_producto]
      );

      const stockActual = parseInt(stockResult.rows[0].stock);

      if (stockActual < item.cantidad) {
        throw new Error(
          `Stock insuficiente para el producto ID ${item.id_producto}`
        );
      }

      // Obtener precio actual del producto
      const productoResult = await client.query(
        `SELECT precio_venta FROM productos WHERE id_producto = $1`,
        [item.id_producto]
      );

      if (productoResult.rowCount === 0) {
        throw new Error(`Producto ID ${item.id_producto} no existe`);
      }

      const precioUnitario = productoResult.rows[0].precio_venta;
      const subtotal = precioUnitario * item.cantidad;
      total += subtotal;

      // Insertar detalle
      await client.query(
        `INSERT INTO detalle_ventas
         (cantidad, precio_unitario, subtotal, id_producto, id_venta)
         VALUES ($1,$2,$3,$4,$5)`,
        [
          item.cantidad,
          precioUnitario,
          subtotal,
          item.id_producto,
          venta.id_venta,
        ]
      );

      // Insertar movimiento de inventario (SALIDA)
      await client.query(
        `INSERT INTO inventario_movimientos
         (tipo, cantidad, comentarios, id_producto, id_usuario)
         VALUES ($1,$2,$3,$4,$5)`,
        [
          "salida",
          -item.cantidad, // negativo porque es salida
          `Venta ID ${venta.id_venta}`,
          item.id_producto,
          req.user.id_usuario,
        ]
      );
    }

    // 3️⃣ Actualizar total de la venta
    await client.query(
      `UPDATE ventas
       SET total = $1
       WHERE id_venta = $2`,
      [total, venta.id_venta]
    );

    await client.query("COMMIT");

    res.status(201).json({
      mensaje: "Venta creada correctamente",
      id_venta: venta.id_venta,
      total,
    });

  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
};

// Cancelar venta
export const cancelarVenta = async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;

    await client.query("BEGIN");

    const ventaResult = await client.query(
      `SELECT * FROM ventas WHERE id_venta = $1`,
      [id]
    );

    if (ventaResult.rowCount === 0) {
      throw new Error("Venta no encontrada");
    }

    if (ventaResult.rows[0].estado === "cancelada") {
      throw new Error("La venta ya está cancelada");
    }

    // Obtener detalles
    const detalles = await client.query(
      `SELECT * FROM detalle_ventas WHERE id_venta = $1`,
      [id]
    );

    // Revertir inventario
    for (const item of detalles.rows) {
      await client.query(
        `INSERT INTO inventario_movimientos
         (tipo, cantidad, comentarios, id_producto, id_usuario)
         VALUES ($1,$2,$3,$4,$5)`,
        [
          "entrada",
          item.cantidad, // positivo porque se devuelve stock
          `Cancelación venta ID ${id}`,
          item.id_producto,
          req.user.id_usuario,
        ]
      );
    }

    // Cambiar estado
    await client.query(
      `UPDATE ventas
       SET estado = 'cancelada'
       WHERE id_venta = $1`,
      [id]
    );

    await client.query("COMMIT");

    res.json({ mensaje: "Venta cancelada correctamente" });

  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
};

// Obtener ventas segun el rol
export const obtenerVentas = async (req, res) => {
  try {
    let query;
    let values = [];

    // Si es admin ve todas
    if (req.user.rol === "admin") {
      query = `
        SELECT v.*, u.nombre_usuario
        FROM ventas v
        JOIN usuarios u ON v.id_usuario = u.id_usuario
        ORDER BY v.fecha_hora DESC
      `;
    } else {
      // Si es vendedor solo ve las suyas
      query = `
        SELECT v.*, u.nombre_usuario
        FROM ventas v
        JOIN usuarios u ON v.id_usuario = u.id_usuario
        WHERE v.id_usuario = $1
        ORDER BY v.fecha_hora DESC
      `;
      values = [req.user.id_usuario];
    }

    const result = await pool.query(query, values);

    res.json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener ventas" });
  }
};
// obtener ventas con su detalle
export const obtenerVentaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Obtener venta
    const ventaResult = await pool.query(
      `SELECT v.*, u.nombre_usuario
       FROM ventas v
       JOIN usuarios u ON v.id_usuario = u.id_usuario
       WHERE v.id_venta = $1`,
      [id]
    );

    if (ventaResult.rowCount === 0) {
      return res.status(404).json({ error: "Venta no encontrada" });
    }

    const venta = ventaResult.rows[0];

    // 🔐 Validación: vendedor solo puede ver su venta
    if (
      req.user.rol !== "admin" &&
      venta.id_usuario !== req.user.id_usuario
    ) {
      return res.status(403).json({ error: "No autorizado" });
    }

    // 2️⃣ Obtener detalle
    const detalleResult = await pool.query(
      `SELECT d.*, p.nombre_producto
       FROM detalle_ventas d
       JOIN productos p ON d.id_producto = p.id_producto
       WHERE d.id_venta = $1`,
      [id]
    );

    res.json({
      venta,
      detalle: detalleResult.rows
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la venta" });
  }
};