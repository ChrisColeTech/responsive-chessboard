// main.tsx - React application entry point
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  // Temporarily disable StrictMode for Stockfish worker compatibility
  // <StrictMode>
    <App />
  // </StrictMode>,
)
