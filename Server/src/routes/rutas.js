const express = require("express");
const app = express()
app.use(express.json)
const router = express.Router();

const {
  getJson,
  getDetalleJson,
  addJson,
  // deleteJson,
  // updateJson,
} = require("../controller/json");  // Corregido el nombre del controlador

// Middleware para validar datos antes de agregar un nuevo registro
function validarData(req, res, next) {
  const { Nombre, Celular, Email, Mensaje } = req.body;


  console.log("Valor en el nombre: " + Nombre)
  if (!Nombre) {
    res.status(400).send({ message: "El nombre no puede estar vacío.", exito: false });
    return
  }

  if (!/^[0-9]+$/.test(Celular)) {
    res.status(400).send({ message: "Ingrese un número de celular válido", exito: false });
    return
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
    res.status(400).send({ message: "Ingrese un correo electrónico válido", exito: false });
    return
  }

  if (!Mensaje) {
    res.status(400).send({ message: "El mensaje no puede estar vacío.", exito: false });
  }

  next();
}

router.get("/json", getJson);
router.get("/json/:id", getDetalleJson);  // Corregido el parámetro en la ruta
router.post("/json", validarData, addJson);
// router.put("/json/:id", validarData, updateJson);
// router.delete("/json/:id", deleteJson);

module.exports = router;
