import { useEffect, useState } from 'react'
import './Propiedades.css'

const API_URL = import.meta.env.VITE_API_URL

function Propiedades() {
  const [propiedades, setPropiedades] = useState([])
  const [clientes, setClientes] = useState([])

  const [editandoId, setEditandoId] = useState(null)
  const [nuevoClienteId, setNuevoClienteId] = useState('')

  const guardarEdicion = async (id) => {
  const propiedad = propiedades.find(p => p.id === id)
  const body = {
    direccion: propiedad.direccion,
    tipo: propiedad.tipo,
    alquiler_base: propiedad.alquiler_base,
    fecha_vencimiento: propiedad.fecha_vencimiento,
    cliente_id: nuevoClienteId || null,
  }

  const res = await fetch(`${API_URL}/api/propiedades/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (res.ok) {
    setEditandoId(null)
    obtenerPropiedades()
  }
}





  // Formulario
  const [direccion, setDireccion] = useState('')
  const [tipo, setTipo] = useState('')
  const [estado, setEstado] = useState('Disponible')
  const [alquilerBase, setAlquilerBase] = useState('')
  const [clienteId, setClienteId] = useState('')
  const [fechaVencimiento, setFechaVencimiento] = useState('')

  const obtenerPropiedades = async () => {
    const res = await fetch(`${API_URL}/api/propiedades`)
    const data = await res.json()
    setPropiedades(data)
  }

  const obtenerClientes = async () => {
    const res = await fetch(`${API_URL}/api/clientes`)
    const data = await res.json()
    setClientes(data)
  }

  const agregarPropiedad = async (e) => {
    e.preventDefault()
    const res = await fetch(`${API_URL}/api/propiedades`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        direccion,
        tipo,
        estado,
        alquiler_base: alquilerBase,
        cliente_id: clienteId || null,
        fecha_vencimiento: fechaVencimiento || null
      }),
    })
    if (res.ok) {
      setDireccion('')
      setTipo('')
      setEstado('Disponible')
      setAlquilerBase('')
      setClienteId('')
      setFechaVencimiento('')
      obtenerPropiedades()
    }
  }

  const eliminarPropiedad = async (id) => {
    await fetch(`${API_URL}/api/propiedades/${id}`, { method: 'DELETE' })
    obtenerPropiedades()
  }

 

  useEffect(() => {
    obtenerPropiedades()
    obtenerClientes()
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🏠 Propiedades</h2>

      <form onSubmit={agregarPropiedad} style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <input placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
        <input placeholder="Tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} required />
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="Disponible">Disponible</option>
          <option value="Ocupada">Ocupada</option>
        </select>
        <input type="number" placeholder="Alquiler base" value={alquilerBase} onChange={(e) => setAlquilerBase(e.target.value)} required />
        <select value={clienteId} onChange={(e) => setClienteId(e.target.value)}>
          <option value="">Sin cliente</option>
          {clientes.map(c => (
            <option key={c.id} value={c.id}>{c.nombre_apellido}</option>
          ))}
        </select>
        <input type="date" value={fechaVencimiento} onChange={(e) => setFechaVencimiento(e.target.value)} />
        <button type="submit">Agregar Propiedad</button>
      </form>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th><th>Dirección</th><th>Tipo</th><th>Estado</th><th>Alquiler</th><th>Cliente</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {propiedades.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.direccion}</td>
              <td>{p.tipo}</td>
              <td>{p.estado}</td>
              <td>${p.alquiler_base}</td>

              <td>
            {p.cliente_id ? (
            <a href={`/clientes/${p.cliente_id}`}>{p.cliente_nombre}</a>
                                                    ) : '—'}
                        </td>


              







             <td>
  {editandoId === p.id ? (
    <>
      <select value={nuevoClienteId} onChange={e => setNuevoClienteId(e.target.value)}>
        <option value="">Sin cliente</option>
        {clientes.map(c => (
          <option key={c.id} value={c.id}>{c.nombre_apellido}</option>
        ))}
      </select>
      <button onClick={() => guardarEdicion(p.id)}>💾 Guardar</button>
      <button onClick={() => setEditandoId(null)}>❌ Cancelar</button>
    </>
  ) : (
    <>
      <button onClick={() => eliminarPropiedad(p.id)}>🗑️ Eliminar</button>
      <button onClick={() => {
        setEditandoId(p.id)
        setNuevoClienteId(p.cliente_id || '')
      }}>✏️ Asignar Cliente</button>
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

export default Propiedades
