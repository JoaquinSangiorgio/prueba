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


//ACTUALIZAR UN CLIENTE

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { nombre_apellido, email, telefono } = req.body
  try {
    const result = await pool.query(
      'UPDATE clientes SET nombre_apellido = $1, email = $2, telefono = $3 WHERE id = $4 RETURNING *',
      [nombre_apellido, email, telefono, id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' })
    }
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


//BORRAR 

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query('DELETE FROM clientes WHERE id = $1 RETURNING *', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' })
    }
    res.json({ message: 'Cliente eliminado correctamente' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
