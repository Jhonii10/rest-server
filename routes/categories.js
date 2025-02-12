const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');
const { crearCategoria, obtenerCategorias, ObtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categories');
const { existCategorybyId } = require('../helpers/dbValidators');
const { validarRoleAdmin } = require('../middlewares/validarRole');


const router = Router();

router.get('/', obtenerCategorias )


router.get('/:id',[
    check('id', 'No es un ID de Mongo valido').isMongoId(),
    check('id').custom(existCategorybyId),
    validarCampos
],ObtenerCategoria)


router.post('/',[
    validarJWT,
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    validarCampos
] , crearCategoria )

router.put('/:id',[
    validarJWT,
    check('id').custom(existCategorybyId),
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    validarCampos
],actualizarCategoria )

router.delete('/:id', [
    validarJWT,
    validarRoleAdmin,
    check('id', 'No es un ID de Mongo valido').isMongoId(),
    check('id').custom(existCategorybyId),
    validarCampos
],borrarCategoria)



module.exports = router;