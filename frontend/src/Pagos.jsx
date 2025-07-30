// src/Pagos.jsx
import { useEffect, useState } from 'react'

function Pagos() {
  const [pagos, setPagos] = useState([])

  useEffect(() => {
    fetch('http://localhost:9001/api/pagos') // Ajustar si usás proxy
      .then(res => res.json())
      .then(data => setPagos(data))
      .catch(err => console.error('Error al cargar pagos:', err))
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Pagos registrados</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Propiedad</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map(pago => (
            <tr key={pago.pago_id}>
              <td>{pago.cliente}</td>
              <td>{pago.direccion_propiedad}</td>
              <td>${pago.monto}</td>
              <td>{pago.fecha_pago}</td>
              <td>{pago.estado}</td>
              <td>{pago.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Pagos
