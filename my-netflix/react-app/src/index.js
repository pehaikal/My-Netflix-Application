import React from 'react'
import ReactDOM from 'react-dom/client'
import '../src/styles/index.scss'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from "./authContext/AuthContext"

const root = ReactDOM.createRoot(
  document.getElementById("root")
)

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
)