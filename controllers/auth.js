const bcryptjs = require("bcryptjs");

const { response } = require("express");
const { googleVerify } = require("../helpers/google-verify");
const { generaJWT } = require("../helpers/jwt");
const Usuario = require("../models/usuario");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //Verificar email.
    const usuarioDB = await Usuario.findOne({ email });

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email no valido",
      });
    }

    //Verficar contraseña
    const validaClave = bcryptjs.compareSync(password, usuarioDB.password);
    if (!validaClave) {
      return res.status(404).json({
        ok: false,
        msg: "Contraseña no valido",
      });
    }

    //Generar TOKEN - JWT
    const token = await generaJWT(usuarioDB.id);

    res.status(200).json({
      ok: true,
      msg: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error: Hable con el administrador" + error,
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const googleToken = req.body.token;

  try {
    const { name, email, picture } = await googleVerify(googleToken);
    const usuarioDB = await Usuario.findOne({ email });
    let usuario;
    if (!usuarioDB) {
      usuario = new Usuario({
        nombre: name,
        email,
        password: "@@@",
        google: true,
      });
    } else {
      //Si existe...
      usuario = usuarioDB;
      usuario.google = true;
      usuario.password = "@@@@@";
      usuario.img = picture;
    }

    //? Grabar en BD
    await usuario.save();

    //? Generar el TOKEN - JWT

    const token = await generaJWT(usuario.id);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      msg: "Error Interno: " + error,
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
