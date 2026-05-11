import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DarkThemeProvider } from './infra/DarkThemeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DarkThemeProvider>
      <App />
    </DarkThemeProvider>
  </StrictMode>,
)
