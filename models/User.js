const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  telefono: { type: String, required: true },
  direccion: { type: String, required: true },
  historial_reservaciones: { type: Array, default: [] },
});

module.exports = mongoose.model("User", UserSchema);
