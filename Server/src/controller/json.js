const fs = require("fs").promises;
const jsonFile = "./src/json/data.json";

const getJson = async (req, resp) => {
  try {
    const datos = await fs.readFile(jsonFile, "utf-8");
    const json = JSON.parse(datos);
    resp.status(200).json(json);
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: "Error en la consulta", exito: false });
  }
};

const getDetalleJson = async (req, resp) => {
  let id = parseInt(req.params.id);
  try {
    const datos = await fs.readFile(jsonFile, "utf-8");
    const json = JSON.parse(datos);
    const item = json.find((fila) => fila.id === id);

    if (item) {
      resp.status(200).json({ data: item, message: "Consulta exitosa", exito: true });
    } else {
      resp.status(404).json({ message: "No se encontró el elemento", exito: false });
    }
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: "Error en la consulta", exito: false });
  }
};

const addJson = async (req, resp) => {

  if(!req.body || !req.body.Nombre || !req.body.Celular || !req.body.Email || !req.body.Mensaje)
  {
    return resp.status(400).json({ message: "Campos incompletos en la petición", exito: false })
  }

  let nuevoMensaje = {
    id: 0,
    name: req.body.Nombre,
    telefono: req.body.Celular,
    mail: req.body.Email,
    mensaje: req.body.Mensaje,
  };

  try {
    const datos = await fs.readFile(jsonFile, "utf-8");
    const json = JSON.parse(datos);

    const id = getNextId(json);
    nuevoMensaje.id = id
    json.push(nuevoMensaje);

    await fs.writeFile(jsonFile, JSON.stringify(json, null, 2), "utf-8");

    resp.status(201).json({ message: "Registro agregado con éxito", exito: true });
    return
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: "Error al agregar registro", exito: false });
  }
};

function getNextId(data) {
  if (data.length === 0) {
    return 1;
  }

  const maxID = Math.max(...data.map((item) => item.id));
  return maxID + 1;
}

module.exports = {
  getJson,
  getDetalleJson,
  addJson,
};