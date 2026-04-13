import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { QueryProvider } from './providers/QueryProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>  {/* ← Add this wrapper */}
        <App />
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>
);