import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWrapper from './App.jsx'; // ใช้ AppWrapper ที่มี Router อยู่แล้ว


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
);