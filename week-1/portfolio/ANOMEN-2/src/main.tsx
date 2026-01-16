/**
 * ANOMEN Storefront - Entry Point
 * Bootstraps the React application with strict mode enabled
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Styles
import './index.css';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
