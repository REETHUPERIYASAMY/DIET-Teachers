// Minimal safe polyfill for `process` in the browser (used by some libs).
if (typeof window.process === 'undefined') {
  // only add empty env container; do not expose secrets
  window.process = { env: {} };
}

// ...regular React app bootstrap...
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import './styles/main.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);