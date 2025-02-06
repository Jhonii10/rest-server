const {Router} = require('express');
const { usersGet, usersPost, usersPut, usersPatch, usersDelete } = require('../controllers/users');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validarCampos');
const { emailExiste, existUserbyId } = require('../helpers/dbValidators');

const router = Router();

router.get('/', usersGet)

router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email','El correo no es valido').isEmail(),
    check('password', 'El password debe de ser de mas de 6 caracteres').isLength({ min: 6 },),
    check('email').custom(emailExiste),
    check('role','El rol proporcionado no es valido').optional().isIn(['ADMIN_ROLE', 'USER_ROLE' , 'VENTAS_ROLE']),
    validarCampos,
] , usersPost)

router.put('/:id',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('role','El rol proporcionado no es valido').optional().isIn(['ADMIN_ROLE', 'USER_ROLE' , 'VENTAS_ROLE']),
    check('id','ID no es valido').isMongoId(),
    check('id').custom(existUserbyId),
    validarCampos,

], usersPut)

router.patch('/', usersPatch)

router.delete('/', usersDelete)

module.exports = router;