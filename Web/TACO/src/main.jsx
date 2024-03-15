import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react'
import ReactDOM from 'react-dom/client'
import {Login} from "./components/principal/login.jsx";
import {InsumosC} from "./components/cocina/insumosC.jsx";
import {MesasC} from "./components/cocina/mesasC.jsx";
import { Configuracion } from './components/cocina/configuracion.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/insumos" Component={InsumosC} />
        <Route path='/mesas' Component={MesasC} />
        <Route path='/configuracion' Component={Configuracion} />
      </Routes>
    </Router>
)
