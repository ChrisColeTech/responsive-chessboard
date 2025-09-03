// CRITICAL: StrictMode temporarily disabled for Web Worker compatibility
// Based on Document 24 Lesson #2: React StrictMode vs Workers
// StrictMode causes double-mounting in development, destroying workers before init
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  // Temporarily disable StrictMode for Stockfish worker compatibility
  // <StrictMode>
    <App />
  // </StrictMode>
)
