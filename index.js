const cors = require("cors");

/** @type {*} */
const express = require("express");
require("dotenv").config();

const { dbConection } = require("./database/config");

/** @type {*} Crea servidor express*/
const app = express();

app.use(cors());

// base de datos

dbConection();

// console.log(process.env);

//Rutas
app.get("/", (req, res) => {
  res.json({
    ok: true,
    msg: "Hola mundo",
  });
});

//credenciales

// ilozano
// DjPuUTk-75TcFmP

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto " + process.env.PORT);
});
