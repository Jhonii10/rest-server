const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { cargarArchivo, actualizarImagen, mostrarImagen } = require('../controllers/uploads');
const { validarArchivo } = require('../middlewares/validarArchivo');


const router = Router();

router.get('/:coleccion/:id', [
    check('id', 'No es un ID de Mongo valido').isMongoId(),
    check('coleccion', `la collecion no es permitida : ${['users', 'products']}`).isIn(['users', 'products']),
    validarCampos
] ,mostrarImagen)

router.post('/',[
    validarArchivo,
    validarCampos
], cargarArchivo);

router.put('/:coleccion/:id', [
    check('id', 'No es un ID de Mongo valido').isMongoId(),
    check('coleccion', `la collecion no es permitida : ${['users', 'products']}`).isIn(['users', 'products']),
    validarArchivo,
    validarCampos,
], actualizarImagen);

module.exports = router;