const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');

const { validarRoleAdmin } = require('../middlewares/validarRole');
const { obtenerProductos, ObtenerProducto, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/product');
const { existProductbyId } = require('../helpers/dbValidators');


const router = Router();

router.get('/', obtenerProductos )


router.get('/:id',[
    check('id', 'No es un ID de Mongo valido').isMongoId(),
    check('id').custom(existProductbyId),
    validarCampos
], ObtenerProducto )


router.post('/',[
    validarJWT,
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    validarCampos
] , crearProducto )

router.put('/:id',[
    validarJWT,
    check('id').custom(existProductbyId),
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    validarCampos
], actualizarProducto)

router.delete('/:id', [
    validarJWT,
    validarRoleAdmin,
    check('id', 'No es un ID de Mongo valido').isMongoId(),
    check('id').custom(existProductbyId),
    validarCampos
], borrarProducto)



module.exports = router;