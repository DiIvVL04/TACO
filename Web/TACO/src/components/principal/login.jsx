import "../principal/css/cssPrincipal.css";
import fondo from "../../../public/assets/vids/fondo.mp4";
import LogoTACO from "../../../public/assets/imgs/LogoTACO.png";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const urlPersonal =
    "http://localhost:8081/api/Proyecto_Integrador/personal/obtener";
  const urlSignin = "http://localhost:8081/api/Proyecto_Integrador/auth/signin";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //codigo del casillero de Carlos: 023
  const iniciarSesion = async () => {
    if (!email || !password) {
      Swal.fire(
        "Error",
        "Por favor, ingresa un correo electrónico y contraseña",
        "error"
      );
      return;
    }

    try {
      const respuesta = await axios.get(urlPersonal);
      const usuarios = respuesta.data.data;

      if (usuarios.length > 0) {
        const usuarioValido = usuarios.find((user) => user.email === email);

        if (usuarioValido) {
          const rol = usuarioValido.rol;
          const nombre = usuarioValido.nombre;
          console.log(`${rol} de ${nombre}`);
          console.log(usuarioValido);

          await axios({
            method: "POST",
            url: urlSignin,
            data: {
              username: usuarioValido.username,
              password: password,
            },
          }).then(function (res) {
            console.log(res);
            if (res.data.status == "OK") {
              localStorage.setItem("token", res.data.data);
              localStorage.setItem("usuario", usuarioValido.idPersonal);
              localStorage.setItem("rol", usuarioValido.rol);

              switch (rol) {
                case "Admin":
                  navigate("/MesasAdm");
                  break;
                case "Caja":
                  navigate("/MesasCaja");
                  break;
                case "Cocina":
                  navigate("/MesasCocina");
                  break;
                default:
                  Swal.fire({
                    iconHtml: `<img src="${LogoTACO}" style="width: 250px; height: auto;">`,
                    title: "Error",
                    text: "El mesero no puede acceder a la interfaz web",
                  });
                  break;
              }
            }
          });
        } else {
          Swal.fire("Error", "Correo y/o contraseña incorrectos", "error");
        }
      } else {
        Swal.fire("Error", "No se encontraron usuarios", "error");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Swal.fire("Error", "Correo y/o contraseña equivocados", "error");
    }
  };

  return (
    <>
      <div className="body-princ">
        <video
          className="video-princ"
          width="100%"
          height="100%"
          autoPlay
          muted
          loop
          style={{
            position: "fixed",
            zIndex: "-1",
            top: "0",
            left: "0",
            objectFit: "cover",
          }}
        >
          <source src={fondo} type="video/mp4" />
        </video>
        <div>
          <div className="container-princ">
            <div className="logo-princ">
              <img src={LogoTACO} alt="Logo" />
            </div>
            <br />
            <form
              onSubmit={(event) => {
                event.preventDefault();
                iniciarSesion();
              }}
            >
              <div>
                <label className="chi-princ">Correo electrónico</label>
                <input
                  className="input-princ"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  placeholder="Correo electrónico"
                  type="email"
                  required
                />
              </div>
              <div>
                <label className="chi-princ">Contraseña</label>
                <div style={{ position: "relative" }}>
                  <input
                    className="input-princ"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    placeholder="Contraseña"
                    type={showPassword ? "text" : "password"}
                    required
                  />
                  <button
                    type="button"
                    className="eye-icon"
                    onClick={togglePasswordVisibility}
                    style={{position: "absolute",right: "10px",top: "50%",transform: "translateY(-50%)",background: "none",border: "none",cursor: "pointer",}}>
                    {showPassword ? "👁️" : "👁️"}
                  </button>
                </div>
                <button
                  type="submit"
                  className="boton-princ"
                  onClick={() => iniciarSesion()}
                >
                  INICIAR SESIÓN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
