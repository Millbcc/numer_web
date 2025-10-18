import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LinearRegression from './LinearRegression.jsx'
import Bisection from './Bisection.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <h1>Bisection Method</h1>
    <Bisection />
    <hr />
    <h1>Linear Regression</h1>
    <LinearRegression />
  </StrictMode>,
)
