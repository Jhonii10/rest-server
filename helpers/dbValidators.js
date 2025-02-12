const { Category } = require("../models");
const User = require("../models/user")

const emailExiste = async(email) => {

    const existEmail = await User.findOne({email});
    
    if (existEmail) {
        throw new Error(`El correo: ${email} ya existe en la base de datos`)
    }
    
}

const existUserbyId = async (id)=>{
    const existUser = await User.findById(id)
    if (!existUser){
        throw new Error(`El usuario con el id: ${id} no existe en la base de datos`);
    }
}


const existCategorybyId = async (id)=>{
    const existCategory = await Category.findById(id)
    if (!existCategory){
        throw new Error(`La categoria con el id: ${id} no existe en la base de datos`);
    }
}


module.exports = {
    emailExiste,
    existUserbyId,
    existCategorybyId
}