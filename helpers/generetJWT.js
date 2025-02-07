const jwt = require('jsonwebtoken');

const generetJWT = ( uid = '')=>{

    return new Promise((resolver,reject)=>{

        const payload = {
            uid
        }

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{
            expiresIn: '4h',

        }, (err , token) =>{
            if (err) {
                console.log(err)
                reject('No se pudo generar el token')
            }else{
                resolver(token)
            }
        } )
    })
}

module.exports = {
    generetJWT
}