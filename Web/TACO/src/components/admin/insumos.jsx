import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import './css/adminNavBar.css';
import './css/adminBody.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import Check from "../../../public/assets/imgs/check.png";
import Cross from "../../../public/assets/imgs/cross.png";
import borrar from "../../../public/assets/imgs/borrar.png";
import editar from "../../../public/assets/imgs/editar.png";

import { NavBarAdmin } from './navbar';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    width: '45%',
    height: '61vh',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderWidth: 2,
    borderColor: 'blue',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
};

export const InsumosAdmin=()=>{
  const urlPlatillos = 'http://localhost:8081/api/Proyecto_Integrador/platillo/';
  const [ platillos, setPlatillos ] = useState([]);
  const [ idPlatillo, setIdPlatillo ] = useState(0);
  const [ nombre, setNombre ] = useState('');
  const [ descripcion, setDescripcion ] = useState('');
  const [ stock, setStock ] = useState(0);
  const [ tipo, setTipo ] = useState('');
  const [ precio, setPrecio ] = useState(0);

  useEffect(() => {
    getPlatillos();
  }, []);

  const getPlatillos = async () => {
    const respuesta = await axios.get(urlPlatillos+'obtener');
    setPlatillos(respuesta.data.data);
    console.log(respuesta.data.data);
  }

  const validar = async (metodo) => {
    let url = '';
    metodo == 'POST' ? url='guardar' : url='actualizar'

    //idPlatillos,nombre, descripcion,stock, tipo, precio,status
    let parametros = {
      idPlatillos: idPlatillo,
      nombre: nombre,
      descripcion: descripcion,
      stock: stock,
      tipo: tipo,
      precio: precio,
      status: true
    }

    enviar(metodo, parametros, url);
  }

  const deletePlatillo = async (idPlatillo) => {
    console.log(idPlatillo);

    let parametros = {
      idPlatillos: idPlatillo
    };
    enviar('DELETE', parametros, 'borrar');
  }

  const enviar = async (metodo, parametros, url) => {
    console.log("Entro con "+metodo+" y "+url);
    await axios({
      method: metodo,
      url: urlPlatillos+url,
      data: parametros
    }).then(function (respuesta) {
      //Si quieren añadir acciones después de enviar peticion
      console.log("Solicitud envida");
      console.log(respuesta);
    })
    .catch(function (error) {
      show_alerta('Error en la Solicitud', 'error');
      console.log(error);
    });

    getPlatillos();
  }

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalEdit, setOpenEdit] = React.useState(false);

  function openModal() {
    setIdPlatillo(0);
    setNombre('');
    setDescripcion('');
    setStock(0);
    setTipo('');
    setPrecio(0);

    setIsOpen(true);
  }

  function afterOpenModal() {
      subtitle.style.color = '#f00';
  }

  function closeModal() {
      setIsOpen(false);
  }

  const openModalEdit = (idPlatillo, nombre, descripcion, stock, tipo, precio) => {
    setOpenEdit(true);

    setIdPlatillo(idPlatillo);
    setNombre(nombre);
    setDescripcion(descripcion);
    setStock(stock);
    setTipo(tipo);
    setPrecio(precio);
  }

  function closeModalEdit() { 
    setOpenEdit(false); 
  }
    
  return (
    <>
    <div className="main-adm">
    <NavBarAdmin selected={2}/>
      <div className="container-table-admin-adm">
        <div className="titulo-adm">
          <p> Leguminosas</p>
          <div className="botones-adm">
            <button className="agregar-adm" onClick={openModal}>Agregar</button>
          </div>
        </div>
        <table className='tabla-admin-adm'>
        <thead>
            <tr>
              <th className="th-adm">Platillo</th>
              <th className="th-adm">Tipo</th>
              <th className="th-adm">Precio</th>
              <th className="th-adm">Stock</th>
              <th className="th-adm">Estado</th>
              <th className="th-adm">Acciones</th>          
            </tr>
          </thead>
          <tbody>
            {platillos.map((platillo, i) => (
              <tr key={i}>
                <td className="td-adm">{platillo.nombre}</td>
                <td className="td-adm">{platillo.tipo}</td>
                <td className="td-adm">{platillo.precio}</td>
                <td className="td-adm">{platillo.stock}</td>
                {platillo.status ? (
                  <td className="td-adm"><img src={Check} alt="check" /></td>
                ) : (
                  <td className="td-adm"><img src={Cross} alt="check" /></td>
                )}
                <td className="td-adm">
                  <img src={editar} onClick={() => {
                    openModalEdit(platillo.idPlatillos, platillo.nombre, platillo.descripcion, platillo.stock, platillo.tipo, platillo.precio);
                  }} alt="check" />
                  &nbsp;
                  <img src={borrar} onClick={() => deletePlatillo(platillo.idPlatillos)} alt="check" />
                </td>
              </tr>
            ))}                
          </tbody>
        </table>
        <br />
      </div>
    </div>
      
    <Modal
    isOpen={modalIsOpen}
    onAfterOpen={afterOpenModal}
    onRequestClose={closeModal}
    style={customStyles}
    contentLabel="Login Modal"
    >
      <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color: 'black', fontSize: 35}}>Agregar Platillo</h2>
      <form style={{
        width: '90%',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center'}}>
          Nombre: <input required type='text' placeholder='Nombre' onChange={(e) => setNombre(e.target.value)} />
          Descripcion: <input required type='text' placeholder='Descripcion' onChange={(e) => setDescripcion(e.target.value)} />
          Stock: <input required type='text' placeholder='Stock' onChange={(e) => setStock(e.target.value)} />
          Tipo: <input required type='text' placeholder='Tipo' onChange={(e) => setTipo(e.target.value)} />
          Precio: <input required type='text' placeholder='Precio' onChange={(e) => setPrecio(e.target.value)} />

          <button onClick={() => validar('POST')}>Guardar Cambios</button>
          <button onClick={closeModal}>Cancelar</button>
      </form>
    </Modal>

    <Modal
    isOpen={modalEdit}
    onAfterOpen={afterOpenModal}
    onRequestClose={closeModalEdit}
    style={customStyles}
    contentLabel="Modal Edit"
    >
      <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color: 'black', fontSize: 35}}>Editar Platillo</h2>
      <form style={{
        width: '90%',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center'}}>
          Nombre: <input required type='text' placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} />
          Descripcion: <input required type='text' placeholder='Descripcion' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
          Stock: <input required type='text' placeholder='Stock' value={stock} onChange={(e) => setStock(e.target.value)} />
          Tipo: <input required type='text' placeholder='Tipo' value={tipo} onChange={(e) => setTipo(e.target.value)} />
          Precio: <input required type='text' placeholder='Precio' value={precio} onChange={(e) => setPrecio(e.target.value)} />

          <button onClick={() => validar('PUT')}>Guardar Cambios</button>
          <button onClick={closeModal}>Cancelar</button>
      </form>
    </Modal>
      
    </>
  )
}