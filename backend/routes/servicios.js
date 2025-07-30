import express from 'express'
import { pool } from '../db.js'

const router = express.Router()

// 🔍 Obtener todos los registros de servicios
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM servicios ORDER BY id')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ➕ Crear nuevo registro de servicios
router.post('/', async (req, res) => {
  const { propiedad_id, luz, agua, gas, municipalidad } = req.body
  try {
    const result = await pool.query(
      `INSERT INTO servicios (propiedad_id, luz, agua, gas, municipalidad)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [propiedad_id, luz, agua, gas, municipalidad]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ✏️ Actualizar registro de servicios
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { propiedad_id, luz, agua, gas, municipalidad } = req.body
  try {
    const result = await pool.query(
      `UPDATE servicios SET 
        propiedad_id = $1, luz = $2, agua = $3, gas = $4, municipalidad = $5
       WHERE id = $6 RETURNING *`,
      [propiedad_id, luz, agua, gas, municipalidad, id]
    )
    if (result.rows.length === 0) return res.status(404).json({ error: 'Registro no encontrado' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ❌ Eliminar registro de servicios
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query('DELETE FROM servicios WHERE id = $1 RETURNING *', [id])
    if (result.rows.length === 0) return res.status(404).json({ error: 'Registro no encontrado' })
    res.json({ message: 'Registro eliminado' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
