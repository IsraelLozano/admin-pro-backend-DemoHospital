/**
 * Rutas...
 * /api/medico
 */

const { Router } = require("express");
const { check } = require("express-validator");
const {
  getMedico,
  crearMedico,
  actualizarMedico,
  borrarMedico,
} = require("../controllers/medico");
const { validarCampos } = require("../middlewares/validar-campos");

const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", getMedico);
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "Nombre del hospital es necesario").not().isEmpty(),
    check("hospital", "El hosptal ID debe de ser valido").isMongoId(),
    validarCampos,
  ],
  crearMedico
);

router.put("/:id", [], actualizarMedico);
router.delete("/:id", borrarMedico);

module.exports = router;
