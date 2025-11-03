import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cuenta.css";

const Cuenta = () => {
  const navigate = useNavigate();
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const historial = usuario?.historial_reservaciones || [];

  const handleCerrarSesion = () => setMostrarConfirmacion(true);
  const confirmarCerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };
  const cancelarCerrarSesion = () => setMostrarConfirmacion(false);

  return (
    <div className="cuenta-container">
      {/* Panel izquierdo */}
      <div className="cuenta-izquierda">
        <div className="foto-perfil-container">
          <img
            src={usuario?.foto || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            alt="Foto de perfil"
            className="foto-perfil"
          />
        </div>
        <h1 className="cuenta-titulo">Mi Cuenta</h1>
        <div className="cuenta-info">
          <p><strong>Teléfono:</strong> {usuario.telefono}</p>
          <p><strong>Dirección:</strong> {usuario.direccion}</p>
          <p><strong>Nombre:</strong> {usuario?.username}</p>
          <p><strong>Correo:</strong> {usuario?.email}</p>
        </div>
        <button className="cerrar-sesion" onClick={handleCerrarSesion}>
          Cerrar Sesión
        </button>
      </div>

      {/* Panel derecho */}
      <div className="cuenta-derecha">
        <div className="historial-header">
          <h2 className="historial-titulo">Historial de Vuelos</h2>
        </div>
        <ul className="historial-lista">
          {historial.length === 0 ? (
            <p>No tienes reservaciones aún.</p>
          ) : (
            historial.map((item, index) => (
              <li key={index} className="historial-item">
                <p>{item.descripcion}</p>
                <span>{item.fecha}</span>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Modal flotante de confirmación */}
      {mostrarConfirmacion && (
        <div className="modal-fondo">
          <div className="modal-contenedor">
            <h2>¿Deseas cerrar sesión?</h2>
            <div className="modal-botones">
              <button className="btn-cancelar" onClick={cancelarCerrarSesion}>Cancelar</button>
              <button className="btn-confirmar" onClick={confirmarCerrarSesion}>Aceptar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cuenta;
