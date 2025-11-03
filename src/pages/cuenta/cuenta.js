import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cuenta.css";

const Cuenta = () => {
  const navigate = useNavigate();
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const usuario = {
    nombre: "Juan Pérez",
    correo: "Juan@email.com",
    telefono: "+52 123 456 7890",
    direccion: "Calle Principal 123, Ciudad de México",
    foto: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  };

  const historial = [
    { id: 1, descripcion: "Vuelo CDMX ✈ Cancún - Aeroméxico", fecha: "12/10/2025" },
    { id: 2, descripcion: "Vuelo Cancún ✈ Guadalajara - Volaris", fecha: "20/09/2025" },
    { id: 3, descripcion: "Vuelo Monterrey ✈ CDMX - VivaAerobus", fecha: "05/09/2025" },
    { id: 4, descripcion: "Vuelo CDMX ✈ Nueva York - American Airlines", fecha: "15/08/2025" },
    { id: 5, descripcion: "Vuelo Tijuana ✈ CDMX - Aeroméxico", fecha: "01/08/2025" },
    { id: 6, descripcion: "Vuelo CDMX ✈ Madrid - Iberia", fecha: "25/07/2025" },
    { id: 7, descripcion: "Vuelo Guadalajara ✈ Los Ángeles - Delta", fecha: "15/07/2025" },
    { id: 8, descripcion: "Vuelo Cancún ✈ París - Air France", fecha: "10/07/2025" },
  ];

  const handleCerrarSesion = () => {
    setMostrarConfirmacion(true);
  };

  const confirmarCerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  const cancelarCerrarSesion = () => {
    setMostrarConfirmacion(false);
  };

  return (
    <div className="cuenta-container">
      {/* Panel izquierdo */}
      <div className="cuenta-izquierda">
        <div className="foto-perfil-container">
          <img src={usuario.foto} alt="Foto de perfil" className="foto-perfil" />
        </div>

        <h1 className="cuenta-titulo">Mi Cuenta</h1>

        <div className="cuenta-info">
          <p><strong>Nombre:</strong> {usuario.nombre}</p>
          <p><strong>Correo:</strong> {usuario.correo}</p>
          <p><strong>Teléfono:</strong> {usuario.telefono}</p>
          <p><strong>Dirección:</strong> {usuario.direccion}</p>
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
          {historial.map((item) => (
            <li key={item.id} className="historial-item">
              <p>{item.descripcion}</p>
              <span>{item.fecha}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal flotante de confirmación */}
      {mostrarConfirmacion && (
        <div className="modal-fondo">
          <div className="modal-contenedor">
            <h2>¿Deseas cerrar sesión?</h2>
            <div className="modal-botones">
              <button className="btn-cancelar" onClick={cancelarCerrarSesion}>
                Cancelar
              </button>
              <button className="btn-confirmar" onClick={confirmarCerrarSesion}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cuenta;
