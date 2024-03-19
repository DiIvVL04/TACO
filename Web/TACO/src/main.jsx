import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react'
import ReactDOM from 'react-dom/client'
import {Login} from "./components/principal/login.jsx";
import {InsumosC} from "./components/cocina/insumosC.jsx";
import {MesasC} from "./components/cocina/mesasC.jsx";
import { Configuracion } from './components/cocina/configuracion.jsx';
import {Index} from './components/caja/index.jsx';
import {ConfigCaja} from './components/caja/configcaja.jsx';
import {Mesas} from './components/admin/mesas.jsx';
import {Configuracionadm} from './components/admin/configuracion.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
      <Routes>
        <Route path="/" Component={MesasC} />
        <Route path='/MesasC' Component={MesasC} />
        <Route path='/Configuracion' Component={Configuracion} />
        <Route path='/Insumos' Component={InsumosC} />
        <Route path='/Login' Component={Login} />
        <Route path='/Index' Component={Index} />
        <Route path='/ConfigCaja' Component={ConfigCaja} />
        <Route path='/Mesas' Component={Mesas} />
        <Route path='/Configuracionadm' Component={Configuracionadm} />
      </Routes>
    </Router>
)
