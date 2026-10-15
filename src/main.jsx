import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const AIFX_RUNTIME_SRC = 'https://cdn.aidesigner.ai/effects/runtime/v1.js'

function loadAifxRuntime() {
  if (typeof window === 'undefined' || window.AIFX) return

  const existingScript = document.querySelector(`script[src="${AIFX_RUNTIME_SRC}"]`)
  if (existingScript) return

  const script = document.createElement('script')
  script.src = AIFX_RUNTIME_SRC
  script.async = true
  script.onload = () => {
    window.dispatchEvent(new CustomEvent('aifx:runtime-ready'))
  }
  script.onerror = () => {
    console.warn('[FoodBridge] Optional AIDesigner topo-lines runtime failed to load.')
  }
  document.head.appendChild(script)
}

loadAifxRuntime()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
