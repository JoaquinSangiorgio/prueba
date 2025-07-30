import express from 'express'
import { pool } from '../db.js'

const router = express.Router()

// 🔍 Obtener todas las propiedades con info del cliente
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT propiedades.*, clientes.nombre_apellido AS cliente_nombre
      FROM propiedades
      LEFT JOIN clientes ON propiedades.cliente_id = clientes.id
      ORDER BY propiedades.id
    `)
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ➕ Crear propiedad
router.post('/', async (req, res) => {
  const { direccion, tipo, estado, alquiler_base, cliente_id, fecha_vencimiento } = req.body
  try {
    const result = await pool.query(
      `INSERT INTO propiedades (direccion, tipo, estado, alquiler_base, cliente_id, fecha_vencimiento)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [direccion, tipo, estado, alquiler_base, cliente_id, fecha_vencimiento]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ✏️ Actualizar propiedad
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { direccion, tipo, estado, alquiler_base, cliente_id, fecha_vencimiento } = req.body
  try {
    const result = await pool.query(
      `UPDATE propiedades SET 
        direccion = $1, tipo = $2, estado = $3, alquiler_base = $4,
        cliente_id = $5, fecha_vencimiento = $6
       WHERE id = $7 RETURNING *`,
      [direccion, tipo, estado, alquiler_base, cliente_id, fecha_vencimiento, id]
    )
    if (result.rows.length === 0) return res.status(404).json({ error: 'Propiedad no encontrada' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ❌ Eliminar propiedad
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query('DELETE FROM propiedades WHERE id = $1 RETURNING *', [id])
    if (result.rows.length === 0) return res.status(404).json({ error: 'Propiedad no encontrada' })
    res.json({ message: 'Propiedad eliminada' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
