import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Login } from './components/principal/login';
import { MesasAdmin } from './components/admin/mesas';
import { ConfiguracionAdmin } from './components/admin/configuracion';
import { InsumosAdmin } from './components/admin/insumos';
import { MesasCocina } from './components/cocina/mesas';
import { ConfiguracionCocina } from './components/cocina/configuracion';
import { InsumosCocina } from './components/cocina/insumos';
import { ConfigCaja } from './components/caja/config';
import { MesasCaja } from './components/caja/mesas';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
      <Routes>
        <Route path='/' Component={Login}/>
        <Route path='/MesasAdm' Component={MesasAdmin}/>
        <Route path='/ConfigAdm' Component={ConfiguracionAdmin}/>
        <Route path='/InsumosAdm' Component={InsumosAdmin}/>
        <Route path='/MesasCocina' Component={MesasCocina}/>
        <Route path='/ConfigCocina' Component={ConfiguracionCocina}/>
        <Route path='/InsumosCocina' Component={InsumosCocina}/>
        <Route path='/ConfigCaja' Component={ConfigCaja}/>
        <Route path='/MesasCaja' Component={MesasCaja}/>
       </Routes>
    </Router>
)
