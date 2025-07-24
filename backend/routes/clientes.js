import express from 'express'
import { pool } from '../db.js'

const router = express.Router()

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clientes ORDER BY id')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Crear un cliente
router.post('/', async (req, res) => {
  const { nombre_apellido, email, telefono } = req.body
  try {
    const result = await pool.query(
      'INSERT INTO clientes (nombre_apellido, email, telefono) VALUES ($1, $2, $3) RETURNING *',
      [nombre_apellido, email, telefono]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
