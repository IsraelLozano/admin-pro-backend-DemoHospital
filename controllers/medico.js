const { response } = require("express");

const Medico = require("../models/medico");

const getMedico = async (req, res) => {
  try {
    const medicos = await Medico.find()
      .populate("usuario", "nombre img")
      .populate("hospital", "nombre img");
    res.json({
      ok: true,
      medicos: medicos,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, consulte logs: " + error,
    });
  }
};

const crearMedico = async (req, res = response) => {
  const uid = req.uid;
  const medico = new Medico({ usuario: uid, ...req.body });

  try {
    const medicoDB = await medico.save();

    res.json({
      ok: true,
      medico: medicoDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, consulte logs: " + error,
    });
  }
};

const actualizarMedico = async (req, res = response) => {
  try {
    res.json({
      ok: true,
      msg: "Recuperar medico",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, consulte logs: " + error,
    });
  }
};

const borrarMedico = async (req, res = response) => {
  try {
    res.json({
      ok: true,
      msg: "Recuperar medico",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, consulte logs: " + error,
    });
  }
};

module.exports = {
  getMedico,
  crearMedico,
  actualizarMedico,
  borrarMedico,
};
