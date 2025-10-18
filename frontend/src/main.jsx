import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Bisection from './Bisection.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Bisection />
  </StrictMode>,
)
