const { generetJWT } = require("../helpers/generetJWT");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");


const login = async (req, res) => {

    const {email, password} = req.body;
    
    try {
        
        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({
                message: "Email o password son incorrectos",
            })
        }

        if (!user.status) {
            return res.status(400).json({
                message: "Usuario inactivo",
            })
        }

        const validPassword = bcryptjs.compareSync(password , user.password);

        if (!validPassword) {
            return res.status(400).json({
                message: "Email o password son incorrectos",
            })
        }

        const token = await generetJWT(user.id);


        return res.json({
            message: "Login exitoso",
            user,
            token
        })

    } catch (error) {
        console.log(error);
        return res.json({
            message: "Error al iniciar sesión",
        })
    }

    res.json({
        email,
        password
    })
}

module.exports = {
    login
}