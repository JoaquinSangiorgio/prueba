import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './ClienteDetalle.css'


const API_URL = import.meta.env.VITE_API_URL

function ClienteDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [cliente, setCliente] = useState(null)
  const [propiedades, setPropiedades] = useState([])
  const [pagos, setPagos] = useState([])

  useEffect(() => {
    obtenerCliente()
  }, [])

  const obtenerCliente = async () => {
    const resCliente = await fetch(`${API_URL}/api/clientes/${id}`)
    const dataCliente = await resCliente.json()
    setCliente(dataCliente)

    const resPropiedades = await fetch(`${API_URL}/api/propiedades`)
    const dataProps = await resPropiedades.json()
    const propias = dataProps.filter(p => p.cliente_id == id)
    setPropiedades(propias)

    const resPagos = await fetch(`${API_URL}/api/pagos`)
    const dataPagos = await resPagos.json()
    const propiosPagos = dataPagos.filter(p => p.cliente_id == id)
    setPagos(propiosPagos)
  }

  if (!cliente) return <p style={{ padding: '2rem' }}>Cargando datos...</p>

  return (
    <div style={{ padding: '2rem' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>⬅ Volver</button>

      <h2>👤 {cliente.nombre_apellido}</h2>
      <p><strong>📧 Email:</strong> {cliente.email}</p>
      <p><strong>📱 Teléfono:</strong> {cliente.telefono || '—'}</p>

      <hr style={{ margin: '2rem 0' }} />

      <h3>🏠 Propiedades asignadas</h3>
      {propiedades.length === 0 ? (
        <p>Este cliente no tiene propiedades asignadas.</p>
      ) : (
        <ul>
          {propiedades.map(p => (
            <li key={p.id}>
              <strong>{p.direccion}</strong> ({p.tipo}) – {p.estado}
              {p.fecha_vencimiento && ` – Vence: ${p.fecha_vencimiento.slice(0, 10)}`}
            </li>
          ))}
        </ul>
      )}

      <hr style={{ margin: '2rem 0' }} />

      <h3>💰 Historial de pagos</h3>
      {pagos.length === 0 ? (
        <p>No hay pagos registrados.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Fecha</th><th>Monto</th><th>Descripción</th><th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map(p => (
              <tr key={p.id}>
                <td>{p.fecha_pago?.slice(0, 10)}</td>
                <td>${Number(p.monto).toLocaleString()}</td>
                <td>{p.descripcion}</td>
                <td>{p.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ClienteDetalle
