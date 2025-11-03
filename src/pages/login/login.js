import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    telefono: "",
    direccion: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister) {
      // Registro
      if (
        !formData.nombre ||
        !formData.correo ||
        !formData.contraseña ||
        !formData.telefono ||
        !formData.direccion
      ) {
        setMessage("Todos los campos son obligatorios");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.nombre,
            email: formData.correo,
            password: formData.contraseña,
            telefono: formData.telefono,
            direccion: formData.direccion,
          }),
        });

        const data = await res.json();
        console.log("Respuesta registro:", data);

        if (res.ok) {
          setMessage(`Usuario ${formData.nombre} registrado correctamente`);
          setIsRegister(false);
        } else {
          setMessage(data.msg || "Error al registrar");
        }
      } catch (err) {
        console.error("Error de registro:", err);
        setMessage("Error del servidor");
      }
    } else {
      // Login
      if (!formData.correo || !formData.contraseña) {
        setMessage("Correo y contraseña obligatorios");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.correo,
            password: formData.contraseña,
          }),
        });

        const data = await res.json();
        console.log("Respuesta login:", data);

        if (res.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("usuario", JSON.stringify(data.user));
          setMessage(`Bienvenido ${data.user.username}`);
          navigate("/home");
        } else {
          setMessage(data.msg || "Error al iniciar sesión");
        }
      } catch (err) {
        console.error("Error de login:", err);
        setMessage("Error del servidor");
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
          {isRegister && (
            <>
              <input
                type="text"
                name="telefono"
                placeholder="Teléfono"
                value={formData.telefono || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                value={formData.direccion || ""}
                onChange={handleChange}
              />
            </>
          )}
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            value={formData.contraseña}
            onChange={handleChange}
          />
          <button type="submit">{isRegister ? "Registrarse" : "Iniciar Sesión"}</button>
        </form>
        <p
          className="toggle-link"
          onClick={() => {
            setIsRegister(!isRegister);
            setMessage("");
          }}
        >
          {isRegister
            ? "¿Ya tienes cuenta? Inicia sesión"
            : "¿No tienes cuenta? Regístrate"}
        </p>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
