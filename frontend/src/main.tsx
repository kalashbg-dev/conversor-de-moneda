import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* React Router provider wrapping NextUI one to pass nagivate into NextUI  */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
