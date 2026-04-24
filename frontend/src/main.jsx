import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { ChefProvider } from './context/ChefContext.jsx'
import { UserProvider } from './context/CreateContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <ChefProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChefProvider>
    </UserProvider>
  </React.StrictMode>,
)
