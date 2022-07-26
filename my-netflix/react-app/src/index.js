import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/styles/index.scss';
import App from './App';
import { AuthContextProvider } from "./authContext/AuthContext";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);