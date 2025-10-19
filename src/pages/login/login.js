import React, { useState } from "react";
import "./login.css";
import usersMock from "../../assets/mockups/users"; // tu mockup de usuarios
import { useNavigate } from "react-router-dom";

function Login() {

  const [isRegister, setIsRegister] = useState(true); // true = registro, false = login
  const [formData, setFormData] = useState({ nombre: "", correo: "", contraseña: "" });
  const [message, setMessage] = useState("");
  
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      // Validación básica de registro
      if (!formData.nombre || !formData.correo || !formData.contraseña) {
        setMessage("Todos los campos son obligatorios");
        return;
      }
      setMessage(`Usuario ${formData.nombre} registrado correctamente (mockup)`);
    } else {
      // Validación básica de login
      const userFound = usersMock.find(
        (user) => user.correo === formData.correo && user.contraseña === formData.contraseña
      );
      if (userFound) {
        setMessage(`Bienvenido ${userFound.nombre} (mockup)`);
        navigate("/home");

      } else {
        setMessage("Usuario o contraseña incorrectos");
      }
    }
  };

  return (
    <div className="login-page">
      <div className={`login-card ${isRegister ? "register" : "login"}`}>
        <h2>{isRegister ? "Registro" : "Iniciar Sesión"}</h2>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={formData.correo}
            onChange={handleChange}
          />
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            value={formData.contraseña}
            onChange={handleChange}
          />
          <button type="submit">{isRegister ? "Registrarse" : "Iniciar Sesión"}</button>
        </form>
        <p className="toggle-link" onClick={() => { setIsRegister(!isRegister); setMessage(""); }}>
          {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
        </p>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
