import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './firebase/config.js';
import './assets/css/index.css';

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Create a root using createRoot
const root = createRoot(document.getElementById('root'));

// Render the app inside the root
root.render(
   <App />
);

// Export Firestore instance
export const db = getFirestore(app);
