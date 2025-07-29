import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL

function Clientes() {
  const [clientes, setClientes] = useState([])
  const [nombre_apellido, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')

  const obtenerClientes = async () => {
    const res = await fetch(`${API_URL}/api/clientes`)
    const data = await res.json()
    setClientes(data)
  }

  const agregarCliente = async (e) => {
    e.preventDefault()
    const res = await fetch(`${API_URL}/api/clientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre_apellido, email, telefono }),
    })
    if (res.ok) {
      setNombre('')
      setEmail('')
      setTelefono('')
      obtenerClientes()
    }
  }

  const eliminarCliente = async (id) => {
    await fetch(`${API_URL}/api/clientes/${id}`, { method: 'DELETE' })
    obtenerClientes()
  }

  useEffect(() => {
    obtenerClientes()
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h2>👥 Lista de Clientes</h2>

      <form onSubmit={agregarCliente} style={{ marginBottom: '2rem' }}>
        <input placeholder="Nombre" value={nombre_apellido} onChange={(e) => setNombre(e.target.value)} required />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        <button type="submit">Agregar Cliente</button>
      </form>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th><th>Nombre</th><th>Email</th><th>Teléfono</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.nombre_apellido}</td>
              <td>{c.email}</td>
              <td>{c.telefono}</td>
              <td>
                <button onClick={() => eliminarCliente(c.id)}>🗑️ Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Clientes
