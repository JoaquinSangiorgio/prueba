import { useState } from 'react'
import Clientes from './Clientes'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [mensaje, setMensaje] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL

  const enviarCorreo = async () => {
    try {
      const respuesta = await fetch(`${API_URL}/api/notificar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'joaquin.sangiorgio@saudasrl.com.ar',
          asunto: 'Correo de prueba desde frontend',
          cuerpo: 'Hola Joaquín, este es un mensaje de prueba desde tu frontend conectado al backend.'
        })
      })

      const data = await respuesta.json()
      if (respuesta.ok) {
        setMensaje('✅ Correo enviado correctamente')
      } else {
        setMensaje(`❌ Error: ${data.error}`)
      }
    } catch (error) {
      setMensaje(`❌ Error general: ${error.message}`)
    }
  }


  return (
    <div>
      <div className="card" style={{ marginTop: '2rem' }}>
        <h2>📬 Enviar correo de prueba</h2>
        <button onClick={enviarCorreo}>Enviar correo</button>
        {mensaje && <p>{mensaje}</p>}
      </div>

      <hr style={{ margin: '2rem 0' }} />

      <Clientes />
    </div>
  )
}

export default App
