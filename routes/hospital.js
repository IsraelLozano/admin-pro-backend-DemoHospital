/**
 * Rutas...
 * /api/hospital
 */

const { Router } = require("express");
const { check } = require("express-validator");
const {
  getHospital,
  crearHospital,
  actualizarHospital,
  borrarHospital,
} = require("../controllers/hospital");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJWT, getHospital);
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "Nombre del hospital es necesario").not().isEmpty(),
    validarCampos,
  ],
  crearHospital
);

router.put("/:id", [], actualizarHospital);
router.delete("/:id", borrarHospital);

module.exports = router;
