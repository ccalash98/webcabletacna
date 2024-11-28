const express = require("express");
const xlsx = require("xlsx");
const path = require("path");

const app = express();
const PORT = 3000;

// Ruta del archivo Excel
const excelPath = path.join(__dirname, "data", "datos.xlsx");

// Middleware para parsear JSON
app.use(express.json());

// Ruta para consultar datos
app.post("/consulta", (req, res) => {
  const { cedula } = req.body;
  if (!cedula) {
    return res.status(400).json({ error: "Debe proporcionar una cédula." });
  }

  try {
    // Leer el archivo Excel
    const workbook = xlsx.readFile(excelPath);
    const sheetName = workbook.SheetNames[0]; // Asume que los datos están en la primera hoja
    const sheet = workbook.Sheets[sheetName];

    // Convertir la hoja a un objeto JSON
    const data = xlsx.utils.sheet_to_json(sheet);

    // Buscar la cédula en los datos
    const result = data.find(row => row.Cédula == cedula);

    if (result) {
      res.json({ success: true, data: result });
    } else {
      res.json({ success: false, message: "No se encontraron datos para esta cédula." });
    }
  } catch (error) {
    console.error("Error al procesar el archivo Excel:", error);
    res.status(500).json({ error: "Ocurrió un error en el servidor." });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
