const fs = require("fs");
const usuarios = require("../models/usuario");
const medicos = require("../models/medico");
const hospitales = require("../models/hospital");

const borrarImagen = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path); //**Borra la imagen anterior*/
  }
};

const actualizarImagen = async (tipo, id, nombreArchivo) => {
  let pathViejo;
  switch (tipo) {
    case "medicos":
      const _medico = await medicos.findById(id);
      if (!_medico) {
        return false;
      }

      pathViejo = `./uploads/medicos/${_medico.img}`;
      borrarImagen(pathViejo);
      _medico.img = nombreArchivo;

      await _medico.save();
      return true;
      break;
    case "hospitales":
      const _hospital = await hospitales.findById(id);
      if (!_hospital) {
        return false;
      }

      pathViejo = `./uploads/hospitales/${_hospital.img}`;
      borrarImagen(pathViejo);
      _hospital.img = nombreArchivo;

      await _hospital.save();
      return true;

      break;
    case "usuarios":
      const _usuario = await usuarios.findById(id);
      if (!_usuario) {
        return false;
      }

      pathViejo = `./uploads/usuarios/${_usuario.img}`;
      borrarImagen(pathViejo);
      _usuario.img = nombreArchivo;

      await _usuario.save();
      return true;

      break;

    default:
      break;
  }
};

module.exports = {
  actualizarImagen,
};
