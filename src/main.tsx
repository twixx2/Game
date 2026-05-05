import { InvProvider, AuthProvider, PageProvider } from "@context";

import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'


import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

import '@shared/styles/main.scss';

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <InvProvider>
          <PageProvider>
            <App />
          </PageProvider>
        </InvProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
