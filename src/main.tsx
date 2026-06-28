import { AuthProvider } from "@context/AuthContext"
import { PageProvider } from "@context/PageContext"

import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter } from 'react-router-dom'
import App from './App'

import '@shared/styles/main.scss';

import Big from "big.js";
Big.DP = 2;
Big.RM = Big.roundDown;

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <PageProvider>
            <App />
          </PageProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
