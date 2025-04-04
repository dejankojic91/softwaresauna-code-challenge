import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import WalkerApp from './WalkerApp.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalkerApp />
  </StrictMode>,
);
