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
import agregar from "../../../public/assets/imgs/agregar-producto.png"

import { NavBarAdmin } from './navbar';
import Swal from 'sweetalert2';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    width: '50%',
    height: '60vh',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
    background: '#fff',
    overflow: 'auto',
    textAlign: 'center'
  },
};

const inputStyles = {
  width: '100%',
  padding: '10px',
  marginBottom: '20px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
  fontSize: '16px',
  outline: 'none',
};


export const InsumosAdmin = () => {
  const urlPlatillos = 'http://localhost:8081/api/Proyecto_Integrador/platillo/';
  const [platillos, setPlatillos] = useState([]);
  const [idPlatillo, setIdPlatillo] = useState(0);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [stock, setStock] = useState(0);
  const [tipo, setTipo] = useState('');
  const [precio, setPrecio] = useState(0);

  useEffect(() => {
    getPlatillos();
  }, []);

  const getPlatillos = async () => {
    const respuesta = await axios.get(urlPlatillos + 'obtener');
    setPlatillos(respuesta.data.data);
    console.log(respuesta.data.data);
  }

  const validar = async (metodo, accion) => {
    let url = '';

    if (accion === 'crear') {
      url = 'guardar';
    } else if (accion === 'editar') {
      url = 'actualizar';
    }

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


  const alertDeletePlatillo = (idPlatillo) => {
    Swal.fire({
      title: "Eliminar platillo",
      text: "¿Está seguro de eliminar este platillo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#C20000",
      cancelButtonColor: "#9B9B9B",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Platillo eliminado",
          text: "Se ha eliminado el platillo",
          icon: "success"
        }).then(() => {
          deletePlatillo(idPlatillo);
        });
      }
    });
  }

  const deletePlatillo = async (idPlatillo) => {
    console.log(idPlatillo);

    let parametros = {
      idPlatillos: idPlatillo
    };
    enviar('DELETE', parametros, 'borrar');
  }


  const alertCreatePlatillo = (event, metodo, accion) => {
    event.preventDefault();
    if (stock < 0) {
      Swal.fire({
        title: "Error",
        text: "El stock no puede ser negativo",
        icon: "error"
      });
      return;
    }
    Swal.fire({
      title: "Crear platillo",
      text: "¿Está seguro de crear un nuevo platillo?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#00FF51",
      cancelButtonColor: "#9B9B9B",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Agregar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Platillo creado",
          text: "Se ha añadido un nuevo platillo",
          icon: "success"
        }).then(() => {
          validar(metodo, accion);
          window.location.reload();
        });
      }
    });
  }

  const alertUpdatePlatillo = (event, metodo, accion) => {
    event.preventDefault()
    Swal.fire({
      title: "Actualizar platillo",
      text: "¿Está seguro de actualizar el platillo actual?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFE22C",
      cancelButtonColor: "#9B9B9B",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Actualizar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Platillo actualizado",
          text: "Se ha actualizado el platillo",
          icon: "success"
        }).then(() => {
          validar(metodo, accion);
          window.location.reload();
        });
      }
    });
  }

  const enviar = async (metodo, parametros, url) => {
    console.log("Entro con " + metodo + " y " + url);
    try {
      const respuesta = await axios({
        method: metodo,
        url: urlPlatillos + url,
        data: parametros
      });

      if (respuesta.status === 200) {
        console.log("Solicitud enviada");
        console.log(respuesta);
      } else {
        throw new Error("Error en la solicitud");
      }
    } catch (error) {
      console.log(error);
    }

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
        <NavBarAdmin selected={2} />
        <div className="container-table-admin-adm">
          <div className="titulo-adm">
            <span> Platillos disponibles</span>
            <div className="botones-adm2">
              <button className="agregar-adm2" onClick={openModal}>
                Agregar
                <img src={agregar} alt="Icono" className="icono-agregar" />
              </button>
            </div>
          </div>
          <table className='tabla-admin-adm'>
            <thead>
              <tr>
                <th className="th-adm">Platillo:</th>
                <th className="th-adm">Tipo:</th>
                <th className="th-adm">Precio:</th>
                <th className="th-adm">Stock:</th>
                <th className="th-adm">Estado:</th>
                <th className="th-adm">Acciones:</th>
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
                    {/* Div del boton de Editar */}
                    <div className="edit-button-wrapper">
                      <button className="edit-button" onClick={() => {
                        openModalEdit(platillo.idPlatillos, platillo.nombre, platillo.descripcion, platillo.stock, platillo.tipo, platillo.precio);
                      }}>
                        <div className="color-section"></div>
                        <div className="diagonal-line"></div>
                        <span>Editar</span>
                        <img src={editar} alt="edit" />
                      </button>
                      {/* Termina el Div de editar */}

                      {/* Botón de Eliminar */}
                      <button className='delete-button' onClick={() => { alertDeletePlatillo(platillo.idPlatillos); }}>
                        <div className="color-section"></div>
                        <div className="diagonal-line"></div>
                        <span>Eliminar</span>
                        <img src={borrar} alt="delete" />
                      </button>
                    </div>                </td>
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
        style={{
          ...customStyles,
          content: {
            ...customStyles.content,
            height: '90vh', // Ajusta la altura del modal
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', // Centra verticalmente los elementos
            alignItems: 'center', // Centra horizontalmente los elementos
            padding: '20px', // Agrega un relleno para suavizar los bordes
            border: 'none', // Elimina el borde para evitar bordes irregulares
          },
        }}
        contentLabel="Nuevo Platillo Modal"
      >
        <h2 style={{ color: 'black', fontSize: 35, marginBottom: '40px', textAlign: 'center' }}>Agregar Platillo</h2>
        <form onSubmit={(e) => alertCreatePlatillo(e, 'POST', 'crear')} style={{ width: '90%', maxWidth: '400px' }}>
          <span className='inputs-modal'>Nombre: <input style={{ ...inputStyles, width: "100%" }} required type='text' placeholder='Nombre' onChange={(e) => setNombre(e.target.value)} /></span>
          <span className='inputs-modal'>Descripción: <input style={{ ...inputStyles, width: "100%" }} required type='text' placeholder='Descripción' onChange={(e) => setDescripcion(e.target.value)} /></span>
          <span className='inputs-modal'>Stock: <input style={{ ...inputStyles, width: "100%" }} required type='number' placeholder='Stock' onChange={(e) => setStock(e.target.value)} /></span>
          <span className='inputs-modal'>Tipo de platillo:
            <select style={{ ...inputStyles, width: "100%", maxWidth: '100%' }} value={tipo} onChange={(e) => setTipo(e.target.value)} required>
              <option disabled value="">Sin clasificación</option>
              <option value="Postre">Postre</option>
              <option value="Fuerte">Fuerte</option>
              <option value="Entrada">Entrada</option>
              <option value="Bebida">Bebida</option>
            </select>
          </span>
          <span className='inputs-modal'>Precio: <input style={{ ...inputStyles, width: "100%" }} required type='number' placeholder='Precio' onChange={(e) => setPrecio(e.target.value)} /></span>
          <div className='container-botones-modal' style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <button type="submit" className='boton-aceptar'>Guardar Cambios</button>
            <button className='boton-cancelar' onClick={closeModal}>Cancelar</button>
          </div>

        </form>
      </Modal>





      <Modal
        isOpen={modalEdit}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModalEdit}
        style={{
          ...customStyles,
          content: {
            ...customStyles.content,
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            border: 'none',
          },
        }}
        contentLabel="Editar Platillo Modal"
      >
        <h2 style={{ color: 'black', fontSize: 35 }}>Editar Platillo</h2>
        <form onSubmit={(e) => alertUpdatePlatillo(e, 'PUT', 'editar')} style={{ width: '90%', maxWidth: '400px' }}>
          <span className='inputs-modal'>Nombre: <input style={{ ...inputStyles, width: "100%" }} required type='text' placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} /></span>
          <span className='inputs-modal'>Descripción: <input style={{ ...inputStyles, width: "100%" }} required type='text' placeholder='Descripción' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} /></span>
          <span className='inputs-modal'>Stock: <input style={{ ...inputStyles, width: "100%" }} required type='number' placeholder='Stock' value={stock} onChange={(e) => setStock(e.target.value)} /></span>
          <span className='inputs-modal'>Tipo de platillo:
            <select style={{ ...inputStyles, width: "100%", maxWidth: '100%' }} value={tipo} onChange={(e) => setTipo(e.target.value)} required>
              <option disabled value="">Seleccionar tipo</option>
              <option value="Postre">Postre</option>
              <option value="Fuerte">Fuerte</option>
              <option value="Entrada">Entrada</option>
              <option value="Bebida">Bebida</option>
            </select>
          </span>
          <span className='inputs-modal'>Precio: <input style={{ ...inputStyles, width: "100%" }} required type='number' placeholder='Precio' value={precio} onChange={(e) => setPrecio(e.target.value)} /></span>
          <div className='container-botones-modal' style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <button type="submit" className='boton-aceptar'>Guardar Cambios</button>
            <button className='boton-cancelar' onClick={closeModalEdit}>Cancelar</button>
          </div>
        </form>
      </Modal>

    </>
  )
}