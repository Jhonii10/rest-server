const User = require("../models/user")

const emailExiste = async(email) => {

    const existEmail = await User.findOne({email});
    
    if (existEmail) {
        throw new Error(`El correo: ${email} ya existe en la base de datos`)
    }
    
}


module.exports = {
    emailExiste
}