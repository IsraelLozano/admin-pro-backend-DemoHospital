const { response } = require("express");

const Hospital = require("../models/hospital");

const getHospital = async (req, res) => {
  try {
    const hospitales = await Hospital.find().populate(
      "usuario",
      "nombre email img"
    );
    res.json({
      ok: true,
      hospital: hospitales,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, consulte logs: " + error,
    });
  }
};

const crearHospital = async (req, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({ usuario: uid, ...req.body });

  try {
    const hospitalDB = await hospital.save();

    res.json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, consulte logs: " + error,
    });
  }
};

const actualizarHospital = async (req, res = response) => {
  try {
    res.json({
      ok: true,
      msg: "Recuperar hospital",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, consulte logs: " + error,
    });
  }
};

const borrarHospital = async (req, res = response) => {
  try {
    res.json({
      ok: true,
      msg: "Recuperar hospital",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, consulte logs: " + error,
    });
  }
};

module.exports = {
  getHospital,
  crearHospital,
  actualizarHospital,
  borrarHospital,
};
