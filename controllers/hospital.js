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
  const uid = req.uid;
  const id = req.params.id;

  try {
    const _hospital = await Hospital.findById(id);
    if (!_hospital) {
      res.status(404).json({
        ok: false,
        msg: "hospital no encontrado",
      });
    }

    // _hospital.nombre = req.body.
    const cambiosHospital = {
      ...req.body,
      usuario: uid,
    };

    const hospitalActualizado = await Hospital.findByIdAndUpdate(
      id,
      cambiosHospital,
      { new: true }
    );

    res.json({
      ok: true,
      resul: hospitalActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, consulte logs: " + error,
    });
  }
};

const borrarHospital = async (req, res = response) => {
  const id = req.params.id;

  try {
    const _hospital = await Hospital.findById(id);
    if (!_hospital) {
      res.status(404).json({
        ok: false,
        msg: "hospital no encontrado",
      });
    }

    await Hospital.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Hospital Eliminado",
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
