import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import clientesRoutes from './routes/clientes.js'
import notificarRoutes from './routes/notificar.js'
import pagosRoutes from './routes/pagos.js'
import propiedadesRoutes from './routes/propiedades.js'
import serviciosRoutes from './routes/servicios.js'

dotenv.config()

const app = express() 
const PORT = process.env.PORT || 9001

// Middlewares
app.use(cors())
app.use(express.json())

// Rutas
app.get('/', (req, res) => {
  res.send('API funcionando correctamente')
})

app.use('/api/clientes', clientesRoutes)
app.use('/api/notificar', notificarRoutes)
app.use('/api/pagos', pagosRoutes)
app.use('/api/propiedades', propiedadesRoutes)
app.use('/api/servicios', serviciosRoutes)


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
