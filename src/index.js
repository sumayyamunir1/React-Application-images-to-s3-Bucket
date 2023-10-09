import React from 'react';
import './css/styles.css';

import { createRoot } from 'react-dom';
import App from './App';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);