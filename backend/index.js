import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { Resend } from 'resend'
import clientesRoutes from './routes/clientes.js'
import notificarRoutes from './routes/notificar.js'
app.use('/api/notificar', notificarRoutes)


dotenv.config()

const app = express()
const PORT = process.env.PORT || 9001

// Configurar Resend
const resend = new Resend(process.env.RESEND_API_KEY)

// Middlewares
app.use(cors())
app.use(express.json())

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando correctamente')
})

// Endpoint para enviar email
app.post('/api/notificar', async (req, res) => {
  const { to, asunto, cuerpo } = req.body

  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // O tu dominio verificado
      to,
      subject: asunto,
      html: `<p>${cuerpo}</p>`,
    })

    if (error) {
      console.error('Error al enviar:', error)
      return res.status(400).json({ error: error.message || error })
    }

    res.status(200).json({ message: 'Correo enviado', data })
  } catch (err) {
    console.error('Error interno:', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})


app.use('/api/clientes', clientesRoutes)

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
