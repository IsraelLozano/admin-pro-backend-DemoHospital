const { response } = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { actualizarImagen } = require("../helpers/actualizar-imange");

const fileUpload = (req, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;

  const tiposValidos = ["hospitales", "medicos", "usuarios"];
  if (!tiposValidos.includes(tipo)) {
    return res.status(404).json({
      ok: true,
      msg: "No es un medicos, usuarios u hospital (tipo)",
    });
  }

  //? Validar q exista un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(404).json({
      ok: true,
      msg: "No seleccionó ningun archivo",
    });
  }

  //* procesar imagen. */
  const file = req.files.imagen;
  const nombreCortado = file.name.split(".");
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];

  //? Validar extension
  const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
  if (!extensionesValidas.includes(extensionArchivo)) {
    return res.status(404).json({
      ok: true,
      msg: "No es una extension valida.",
    });
  }

  //? Generar el nombre del archivo
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

  // ?Parh para garbar imagen

  const path = `./uploads/${tipo}/${nombreArchivo}`;

  // ? Mover la imagen.
  file.mv(path, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        msg: "Error al move la imgen",
      });
    }

    //? Aquí se debe actualizar en la BD la imagen.

    actualizarImagen(tipo, id, nombreArchivo);

    res.json({
      ok: true,
      msg: "ARchivo subdo: " + nombreArchivo,
    });
  });
};

const retornoImagen = (req, res = response) => {
  const tipo = req.params.tipo;
  const foto = req.params.foto;

  const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
  // ? Imagen por defecto
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(pathImg);
  }
};

module.exports = {
  fileUpload,
  retornoImagen,
};
