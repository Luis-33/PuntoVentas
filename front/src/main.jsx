import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Holamundo from './components/holamundo/holamundo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
    <Holamundo/>
  </StrictMode>,
)
