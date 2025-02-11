const { request, response } = require("express");


const validarRoleAdmin = (req = request , res = response , next)=>{

    if(!req.user){
        return res.status(500).json({
            msg: 'No hay token'
        })
    };

    const {role , name } = req.user;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} - No es administrador`
        })

    };



    next();

}

module.exports = {
    validarRoleAdmin
}