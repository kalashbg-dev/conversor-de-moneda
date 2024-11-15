import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import App from './App';
import './index.css';
import './i18n/config'; // i18n configuration
const queryClient = new QueryClient();

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