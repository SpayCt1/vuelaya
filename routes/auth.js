const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ------------------- Registro -------------------
router.post("/register", async (req, res) => {
  const { username, email, password, telefono, direccion } = req.body;

  if (!username || !email || !password || !telefono || !direccion) {
    console.log("Registro fallido: faltan campos");
    return res.status(400).json({ msg: "Todos los campos son obligatorios" });
  }



  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`Registro fallido: el email ${email} ya existe`);
      return res.status(400).json({ msg: "Usuario ya existe" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      telefono,
      direccion,
      historial_reservaciones: [],
    });    
    await newUser.save();

    console.log(`Usuario registrado correctamente: ${username} (${email})`);
    return res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (err) {
    console.error("Error al registrar usuario:", err.message);
    return res.status(500).json({ msg: "Error del servidor", error: err.message });
  }
});

// ------------------- Login -------------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Login fallido: faltan campos");
    return res.status(400).json({ msg: "Correo y contraseña son obligatorios" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`Login fallido: usuario con email ${email} no encontrado`);
      return res.status(400).json({ msg: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`Login fallido: contraseña incorrecta para ${email}`);
      return res.status(400).json({ msg: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log(`Usuario logueado correctamente: ${user.username} (${email})`);

    return res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        telefono: user.telefono,       // ✔
        direccion: user.direccion,
        historial_reservaciones: user.historial_reservaciones,
      },
    });
  } catch (err) {
    console.error("Error al hacer login:", err.message);
    return res.status(500).json({ msg: "Error del servidor", error: err.message });
  }
});

module.exports = router;
