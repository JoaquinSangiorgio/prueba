import './Dashboard.css'
import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL

function Dashboard() {
  const [totalProps, setTotalProps] = useState(0)
  const [ocupadas, setOcupadas] = useState(0)
  const [totalClientes, setTotalClientes] = useState(0)
  const [ingresos, setIngresos] = useState(0)

  useEffect(() => {
    obtenerResumen()
  }, [])

  const obtenerResumen = async () => {
    const [resProps, resClientes, resPagos] = await Promise.all([
      fetch(`${API_URL}/api/propiedades`),
      fetch(`${API_URL}/api/clientes`),
      fetch(`${API_URL}/api/pagos`)
    ])

    const props = await resProps.json()
    const clientes = await resClientes.json()
    const pagos = await resPagos.json()

    setTotalProps(props.length)
    setOcupadas(props.filter(p => p.estado === 'Ocupada').length)
    setTotalClientes(clientes.length)

    const now = new Date()
    const mesActual = now.getMonth() + 1
    const anioActual = now.getFullYear()

    const ingresosMes = pagos
      .filter(p => {
        const fecha = new Date(p.fecha_pago)
        const mesPago = fecha.getMonth() + 1
        const anioPago = fecha.getFullYear()
        return mesPago === mesActual && anioPago === anioActual
      })
      .reduce((acc, p) => acc + Number(p.monto), 0)

    setIngresos(ingresosMes)
  }

  return (
      
<header>
  
</header>
      
  )
}

export default Dashboard
