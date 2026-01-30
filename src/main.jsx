import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './assets/context/AuthContext.jsx'
import { InvProvider } from './assets/context/InvContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <InvProvider>
          <App />
        </InvProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
