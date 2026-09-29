import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { MarketplaceProvider } from './marketplace/context/MarketplaceContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MarketplaceProvider>
      <App />
    </MarketplaceProvider>
  </StrictMode>,
);
