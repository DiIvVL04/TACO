import React from 'react'
import ReactDOM from 'react-dom/client'
import { Inicio } from "./components/principal/inicio.jsx";
import {Login} from "./components/principal/login.jsx";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Inicio />
    <Login/>
  </React.StrictMode>,
)
