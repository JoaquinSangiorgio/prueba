import pkg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const { Pool } = pkg

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // necesario para Railway
  },
})

// await pool.query(`ALTER TABLE pagos RENAME COLUMN "descripción" TO descripcion`)


// await pool.query(`ALTER TABLE servicios DROP COLUMN mes`)