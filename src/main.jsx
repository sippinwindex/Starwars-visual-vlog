import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './pages/Layout.jsx'
import './index.css'
import { StoreWrapper } from './hooks/useGlobalReducer.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreWrapper>
      <Layout />
    </StoreWrapper>
  </React.StrictMode>,
)