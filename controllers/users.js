const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const usersGet = (req, res) => {

    res.json({
        message: 'get api',
    })
}

const usersPost = async (req, res) => {

    const {name , email, password , role} = req.body;

    const salt = bcryptjs.genSaltSync();
    
    const user = new User({name , email, password, role});
    user.password = bcryptjs.hashSync(password, salt);
    
    await user.save();

    res.json({
        user
    })
}

const usersPut = async (req, res) => {

   const {id} = req.params;
   const { _id, password, google, email, ...rest} = req.body;

   if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password , salt)
   }

    const user = await User.findByIdAndUpdate(id, rest, {new: true});
   
    res.json({
        message: 'Usuario actualizado exitosamente',
        user
    })
   

   
}

const usersPatch = (req, res) => {
    res.json({
        message: 'patch api'
    })
}

const usersDelete = (req, res) => {
    res.json({
        message: 'delete api'
    })
}


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}