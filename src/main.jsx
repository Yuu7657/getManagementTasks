import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Use createRoot for React 18+ compatibility
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
root.render(<App />);