import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

router.post('/', async (req, res) => {
  const { to, asunto, cuerpo } = req.body

  try {
    const respuesta = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev', // o tu dominio verificado
        to,
        subject: asunto,
        html: `<p>${cuerpo}</p>`
      })
    })

    const data = await respuesta.json()

    if (!respuesta.ok) {
      return res.status(400).json({ error: data.message || 'Error enviando correo' })
    }

    res.status(200).json({ message: 'Correo enviado correctamente', data })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
