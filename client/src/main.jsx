import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'

// Ideally this should be import.meta.env.VITE_GOOGLE_CLIENT_ID
const clientId = "427687386236-l1iintgsf9s4n95p63lqpq0bn0o56nu0.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
