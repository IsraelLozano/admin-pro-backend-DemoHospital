const bcryptjs = require("bcryptjs");

const { response } = require("express");
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

module.exports = {
  login,
};
