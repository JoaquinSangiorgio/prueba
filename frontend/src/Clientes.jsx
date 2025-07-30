import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL

function Clientes() {
  const [clientes, setClientes] = useState([])
  const [nombre_apellido, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [editandoId, setEditandoId] = useState(null)
  const [editData, setEditData] = useState({ nombre_apellido: '', email: '', telefono: '' })

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

 const comenzarEdicion = (cliente) => {
    setEditandoId(cliente.id)
    setEditData({
      nombre_apellido: cliente.nombre_apellido,
      email: cliente.email,
      telefono: cliente.telefono
    })
  }

    const cancelarEdicion = () => {
    setEditandoId(null)
    setEditData({ nombre_apellido: '', email: '', telefono: '' })
  }

  const guardarEdicion = async (id) => {
    await fetch(`${API_URL}/api/clientes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData)
    })
    setEditandoId(null)
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
              <td>
                {editandoId === c.id ? (
                  <input value={editData.nombre_apellido} onChange={e => setEditData({ ...editData, nombre_apellido: e.target.value })} />
                ) : c.nombre_apellido}
              </td>
              <td>
                {editandoId === c.id ? (
                  <input value={editData.email} onChange={e => setEditData({ ...editData, email: e.target.value })} />
                ) : c.email}
              </td>
              <td>
                {editandoId === c.id ? (
                  <input value={editData.telefono} onChange={e => setEditData({ ...editData, telefono: e.target.value })} />
                ) : c.telefono}
              </td>
              <td>
                {editandoId === c.id ? (
                  <>
                    <button onClick={() => guardarEdicion(c.id)}>💾 Guardar</button>
                    <button onClick={cancelarEdicion}>❌ Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => comenzarEdicion(c)}>✏️ Editar</button>
                    <button onClick={() => eliminarCliente(c.id)}>🗑️ Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Clientes