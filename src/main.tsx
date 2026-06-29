import { InvProvider, AuthProvider, PageProvider } from "@context";

import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from 'react-router-dom'
import App from './App'

import '@shared/styles/main.scss';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <InvProvider>
            <PageProvider>
              <App />
            </PageProvider>
          </InvProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
