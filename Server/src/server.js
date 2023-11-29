const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// Establecer la carpeta de archivos estáticos
app.use(express.static("C:/Users/Piero/Desktop/1er ENTREGABLE/Cliente"));

app.get("/", (req, res) => {
  res.status(200).sendFile("C:/Users/Piero/Desktop/1er ENTREGABLE/Cliente/1er Proyecto.html");
});

app.use("/api", require("./routes/rutas.js"));

// Manejar errores 404
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "Public", "404.html"));
});

app.listen(port, () => {
  console.log("Servidor disponible en http://localhost:" + port);
});