import React, { useState, useEffect } from "react";
import { vuelos } from "../../assets/mockups/vuelos";
import { useNavigate, useLocation } from "react-router-dom";
import "./destinos.css";

// Hook para leer query params
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Vuelos = () => {
  const navigate = useNavigate();
  const query = useQuery();

  const origenFilter = query.get("origen")?.toLowerCase() || "";
  const destinoFilter = query.get("destino")?.toLowerCase() || "";
  const fechaFilter = query.get("fecha") || "";
  const pasajerosParam = query.get("pasajeros");
  const pasajerosFilter =
    pasajerosParam && !isNaN(parseInt(pasajerosParam, 10))
      ? parseInt(pasajerosParam, 10)
      : 0;

  const [vuelosFiltrados, setVuelosFiltrados] = useState(vuelos);

  useEffect(() => {
    const filtrados = vuelos.filter((v) => {
      const matchOrigen = origenFilter ? v.origen.toLowerCase().includes(origenFilter) : true;
      const matchDestino = destinoFilter ? v.destino.toLowerCase().includes(destinoFilter) : true;
      const matchFecha = fechaFilter ? v.fecha_salida === fechaFilter : true;
      const matchPasajeros = pasajerosFilter > 0 ? v.pasajeros === pasajerosFilter : true;

      return matchOrigen && matchDestino && matchFecha && matchPasajeros;
    });

    setVuelosFiltrados(filtrados);
  }, [origenFilter, destinoFilter, fechaFilter, pasajerosFilter]);

  const handleClearFilters = () => {
    setVuelosFiltrados(vuelos);
    navigate("/vuelos");
  };

  return (
    <div className="vuelos-container">
      {/* Contenedor flex para H1 y botón */}
      <div className="header-with-button">
        <h1>Vuelos disponibles</h1>
        <button className="clear-btn" onClick={handleClearFilters}>
          Limpiar filtros
        </button>
      </div>

      {vuelosFiltrados.length === 0 ? (
        <p>No se encontraron vuelos con esos datos.</p>
      ) : (
        <div className="tarjetas-grid">
          {vuelosFiltrados.map((vuelo) => (
            <div
              key={vuelo.id}
              className="tarjeta"
              onClick={() => navigate(`/reservacion/${vuelo.id}`)}
            >
              <img src={vuelo.image} alt={vuelo.nombre} />
              <div className="contenido">
                <h2>{vuelo.nombre}</h2>
                <p><strong>Origen:</strong> {vuelo.origen}</p>
                <p><strong>Destino:</strong> {vuelo.destino}</p>
                <p><strong>Salida:</strong> {vuelo.fecha_salida}</p>
                <p><strong>Pasajeros:</strong> {vuelo.pasajeros}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/reservacion/${vuelo.id}`);
                  }}
                >
                  Ver más
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Vuelos;
