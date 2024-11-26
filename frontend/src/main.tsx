import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import App from './App';
import './index.css';
import './i18n/config';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,  // No reintentar consultas fallidas
      refetchOnWindowFocus: false,  // No recargar al enfocar la ventana
      staleTime: 5000,  // Tiempo antes de considerar los datos obsoletos
      gcTime: 10 * 60 * 1000,  // Tiempo antes de limpiar la caché
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <App />
          <Toaster position="bottom-right" richColors />
        </NextUIProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);