const { response, request } = require("express");
const { generetJWT } = require("../helpers/generetJWT");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { googleVerify } = require("../helpers/googleVerify");


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

}

const googleSignIn = async ( req = request, res = response) => {

    const { id_token } = req.body

    try {
        
            const googleUser = await googleVerify(id_token);
        

            const {name, email , img} = googleUser;

            let user = await User.findOne({email});


            if (!user) {
                
                const data = {
                    name,
                    email,
                    password: 'google-auth',
                    img,
                    google : true,
                }

                user = new User(data)

                await user.save();
;
                

            }
            
            if (!user.status) {
                return res.status(401).json({
                    message: "Usuario inactivo hable con el administrador"
                })
            }

            const token = await generetJWT(user.id)
            
            res.json({
                user,
                token
            })
        
    } catch (error) {
        res.status(400).json({
            ok:false,
            message: "Token de google no se pudo verificar",
        })
    }
}

module.exports = {
    login,
    googleSignIn
}