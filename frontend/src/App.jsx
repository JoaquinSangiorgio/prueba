import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Clientes from './Clientes'
import Propiedades from './Propiedades'
import Pagos from './Pagos'
import ClienteDetalle from './ClienteDetalle'
// import Servicios from './Servicios' // Más adelante
import Dashboard from './Dashboard' // Opcional

function App() {

  const API_URL = import.meta.env.VITE_API_URL
  return (
    <BrowserRouter>
      <div style={{ padding: '1rem', background: '#eee' }}>
        <h1>🏠 Inmobiliaria App</h1>
        <nav style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <Link to="/">Dashboard</Link>
          <Link to="/clientes">Clientes</Link>
          <Link to="/propiedades">Propiedades</Link>
          <Link to="/pagos">Pagos</Link>
          {/* <Link to="/servicios">Servicios</Link> */}
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/propiedades" element={<Propiedades />} />
        <Route path="/clientes/:id" element={<ClienteDetalle />} />
        <Route path="/pagos" element={<Pagos />} />
        {/* <Route path="/servicios" element={<Servicios />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
