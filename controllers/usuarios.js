const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generaJWT } = require("../helpers/jwt");

/**
 * @description Retorna la lista de usuarios
 * @author Israel Daniel Lozano del Castillo
 * @date 28/12/2021
 * @param {*} req Recibe el request
 * @param {*} res Devuelve un response
 */
const getUsuarios = async (req, res) => {
  const desde = Number(req.query.desde) || 0;
  const [usuarios, total] = await Promise.all([
    Usuario.find({}, "nombre email google role img").skip(desde).limit(5),
    // Usuario.count(),

    Usuario.countDocuments(),
  ]);
  res.json({
    ok: true,
    usuarios: usuarios,
    total: total,
  });
};

/**
 * @description Creacion de usuarios
 * @author Israel Daniel Lozano del Castillo
 * @date 28/12/2021
 * @param {*} req Recibe un request
 * @param {*} res Devuelve un response
 */
const crearUsuarios = async (req, res = response) => {
  const { email, password, nombre } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: "false",
        msg: "El correo ya esta registrado",
      });
    }
    const usuario = new Usuario(req.body);

    //Encriptando contraseña.
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //Grabar usuario.
    await usuario.save();

    //Generar TOKEN - JWT
    const token = await generaJWT(usuario.id);

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... resvisar logs",
    });
  }
};

/**
 * @description Actualizacion el usuario
 * @author Israel Daniel Lozano del Castillo
 * @date 28/12/2021
 * @param {*} req Información del request
 * @param {*} [res=response]
 * @return {*} Retorna una nueva entidad actualizada.
 */
const actualizarUsuario = async (req, res = response) => {
  //TODO: validar token y comproba si es el usuario correcto.
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe el usuario por ese Id",
      });
    }

    // ? Actualizaciones
    const { password, google, email, ...campos } = req.body;

    if (usuarioDB.email !== email) {
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya esiste el usuario con ese email.",
        });
      }
    }

    campos.email = email;

    //*Eliminamos los campos que no queremos que se actualizen....
    // delete campos.password;
    // delete campos.google;

    //TODO: Proceso de actualizacion..
    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true /** ? Con eso le decimos que no devuelvan los datos actualizados  */,
    });
    res.json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error inespeado.",
    });
  }
};

const borrarUsuario = async (req, res = response) => {
  var id = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(id);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe el usuario por ese Id",
      });
    }

    await Usuario.findByIdAndDelete(id);

    res.status(200).json({
      ok: true,
      msg: id,
    });
  } catch (error) {
    console.error(error);
    res.status(200).json({
      ok: false,
      msg: "Error interno" + error,
    });
  }
};

module.exports = {
  getUsuarios,
  crearUsuarios,
  actualizarUsuario,
  borrarUsuario,
};
