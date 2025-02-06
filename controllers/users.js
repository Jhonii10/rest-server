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

const usersPut = (req, res) => {
    
    const {id} = req.params;

    res.json({
        message: 'put api',
        id
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