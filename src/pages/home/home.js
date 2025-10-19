import React, { useEffect, useState } from "react";
import "./home.css";
import {
  CalendarToday,
  FlightTakeoff,
  People,
} from "@mui/icons-material";
import { destinationsMock } from "../../assets/mockups/destinationsMock"; // 👈 import del mock

function Home() {
  const [destinations, setDestinations] = useState([]);

  // Simula una petición a base de datos (por ahora usa el mock)
  useEffect(() => {
    // Simulamos un "fetch" con retraso (como si fuera API)
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 300)); // 300 ms
      setDestinations(destinationsMock);
    };
    fetchData();
  }, []);

  // Ejemplo básico del botón "Buscar"
  const handleSearch = () => {
    const origin = document.querySelector('input[placeholder="Origen"]').value;
    const destination = document.querySelector('input[placeholder="Destino"]').value;
    const dates = document.querySelector('input[placeholder="Fechas"]').value;
    const passengers = document.querySelector('input[placeholder="Pasajeros"]').value;

    alert(
      `Buscando vuelos de ${origin} a ${destination}\nFecha: ${dates}\nPasajeros: ${passengers}`
    );
  };

  return (
    <div className="home-page">
      {/* Banner con formulario */}
      <section
        className="banner"
      >
        <div className="search-card">
          <h2>Busca tu vuelo</h2>
          <div className="search-form">
            <div className="input-group">
              <FlightTakeoff />
              <input type="text" placeholder="Origen" />
            </div>
            <div className="input-group">
              <FlightTakeoff />
              <input type="text" placeholder="Destino" />
            </div>
            <div className="input-group">
              <CalendarToday />
              <input type="text" placeholder="Fechas" />
            </div>
            <div className="input-group">
              <People />
              <input type="number" placeholder="Pasajeros" min="1" />
            </div>
            <button className="search-btn" onClick={handleSearch}>
              Buscar
            </button>
          </div>
        </div>
      </section>

      {/* Destinos populares */}
      <section className="destinations">
        <h3>Destinos Populares</h3>

        <div className="cards-container">
          {destinations.length > 0 ? (
            destinations.map((dest) => (
              <div key={dest._id} className="destination-card">
                <img src={dest.image} alt={dest.name} />
                <h4>{dest.name}</h4>
                <p>{dest.description}</p>
              </div>
            ))
          ) : (
            <p>Cargando destinos...</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2025 VuelaYa. Todos los derechos reservados.</p>
        <div className="footer-links">
          <span>Privacidad</span>
          <span>Términos</span>
          <span>Ayuda</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;
