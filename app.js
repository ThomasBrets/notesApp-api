const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/db");
const cookieParser = require('cookie-parser'); // Importar cookie-parser
const routes = require("./routes");

// Middlewares
app.use(express.json());
app.use(cookieParser()); // Usar cookie-parser para manejar cookies

// Configurar CORS correctamente para permitir solicitudes del frontend
app.use(
  cors({
    origin: "https://notes-app-frontend-pearl.vercel.app/", // El origen del frontend
    credentials: true, // Permitir el envío de cookies y autenticación entre orígenes
  })
);

// Rutas
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("funciona");
});

// Servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server on ${port}`);
});

module.exports = app;