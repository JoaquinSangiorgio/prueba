import express from 'express'
import { pool } from '../db.js'

const router = express.Router()

// 🔍 Obtener todos los pagos con cliente y propiedad
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
          pagos.id AS pago_id,
          CAST(pagos.monto AS INTEGER) AS monto,
          TO_CHAR(pagos.fecha_pago, 'YYYY-MM-DD') AS fecha_pago,
          pagos.descripcion,
          pagos.estado,
          clientes.nombre_apellido AS cliente,
          propiedades.direccion AS direccion_propiedad
          FROM pagos
          JOIN clientes ON pagos.cliente_id = clientes.id
          JOIN propiedades ON pagos.propiedad_id = propiedades.id
          ORDER BY pagos.id
    `)
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


// ➕ Crear nuevo pago
router.post('/', async (req, res) => {
  const { cliente_id, propiedad_id, monto, fecha_pago, descripcion, estado } = req.body
  try {
    const result = await pool.query(
      `INSERT INTO pagos (cliente_id, propiedad_id, monto, fecha_pago, descripcion, estado)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [cliente_id, propiedad_id, monto, fecha_pago, descripcion, estado]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ✏️ Actualizar pago
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { cliente_id, propiedad_id, monto, fecha_pago, descripcion, estado } = req.body
  try {
    const result = await pool.query(
      `UPDATE pagos SET 
        cliente_id = $1, propiedad_id = $2, monto = $3, fecha_pago = $4,
        descripcion = $5, estado = $6
       WHERE id = $7 RETURNING *`,
      [cliente_id, propiedad_id, monto, fecha_pago, descripcion, estado, id]
    )
    if (result.rows.length === 0) return res.status(404).json({ error: 'Pago no encontrado' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ❌ Eliminar pago
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query('DELETE FROM pagos WHERE id = $1 RETURNING *', [id])
    if (result.rows.length === 0) return res.status(404).json({ error: 'Pago no encontrado' })
    res.json({ message: 'Pago eliminado' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 🔎 Obtener detalle de un pago (con cliente y propiedad)
router.get('/:id/detalle', async (req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query(`
      SELECT 
        pagos.id AS pago_id,
        pagos.monto,
        pagos.fecha_pago,
        pagos.descripcion,
        pagos.estado,
        clientes.id AS cliente_id,
        clientes.nombre_apellido AS cliente_nombre,
        clientes.email,
        clientes.telefono,
        propiedades.id AS propiedad_id,
        propiedades.direccion AS propiedad_direccion
      FROM pagos
      JOIN clientes ON pagos.cliente_id = clientes.id
      JOIN propiedades ON pagos.propiedad_id = propiedades.id
      WHERE pagos.id = $1
    `, [id])

    if (result.rows.length === 0) return res.status(404).json({ error: 'Pago no encontrado' })

    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})




export default router
