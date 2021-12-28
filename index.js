const cors = require("cors");
const express = require("express");

/** Congiruacion de los enviroments. */
require("dotenv").config();

const { dbConection } = require("./database/config");

const app = express();

app.use(cors());

/**Lectura y parseo del body */
app.use(express.json());

// base de datos
dbConection();

//Rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/login", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto " + process.env.PORT);
});

/**Anotaciones
 * !OJO
 * credenciales
ilozano
DjPuUTk-75TcFmP
 */
