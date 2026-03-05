import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import Holamundo from './components/holamundo/holamundo.jsx'
import Login from './components/login/login.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App/> */}
    <Login/>
  </StrictMode>,
)
