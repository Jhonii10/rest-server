const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { cargarArchivo } = require('../controllers/uploads');


const router = Router();

router.post('/', [] , cargarArchivo);

module.exports = router;