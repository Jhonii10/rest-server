const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const usersGet = async(req, res) => {

    const {desde = 0 , limite = 5} = req.query;
    const query = { status: true };

    const usersfind = User.find(query)
    .skip(Number(desde))
    .limit(Number(limite));

    const usersCounter = User.countDocuments();

    const [total ,users] = await Promise.all([
        usersCounter,
        usersfind,
        
    ])


    res.json({
        total,
        users
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

const usersDelete = async (req, res) => {

    const {id} = req.params;
    const userDelete = await User.findByIdAndDelete(id)

    if (userDelete) {
        res.json({
            success: true,
            message: `Usuario con ID: ${id} eliminado exitosamente`
        })
        
    }

}


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}