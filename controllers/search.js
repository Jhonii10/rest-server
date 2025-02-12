const { response } = require("express");
const { isValidObjectId } = require("mongoose");
const  {User, Product, Category}  = require("../models");

const coleccionePermitidas = [
    "users",
    "categories",
    "products"

];


const buscarUsuarios = async (termino = '', res = response ) => {

  
    const esMongoID = isValidObjectId(termino);


    if (esMongoID) {
        const user = await User.findById(termino);
        return res.json({
            results: user ? [user] : [],
        });
    }

    const regex = new RegExp(termino, 'i');

    const users = await User.find({
        $or: [
            { name: regex },
            { email: regex },
        ],
        $and: [{status : true}]
    });

    res.json({
        results: users,
        total: users.length
    })
}

const buscarCategorias = async (termino = '', res = response ) => {

  
    const esMongoID = isValidObjectId(termino);


    if (esMongoID) {
        const category = await Category.findById(termino);
        return res.json({
            results: category ? [category] : [],
        });
    }

    const regex = new RegExp(termino, 'i');

    const categories = await Category.find({
        $or: [
            { name: regex },
        ],
        $and: [{estado : true}]
    });

    res.json({
        results: categories,
        total: categories.length
    })
}


const buscarProductos = async (termino = '', res = response ) => {

  
    const esMongoID = isValidObjectId(termino);


    if (esMongoID) {
        const product = await Product.findById(termino).populate('category','name');
        return res.json({
            results: product ? [product] : []
        });
    }

    const regex = new RegExp(termino, 'i');

    const products = await Product.find({
        $or: [
            { name: regex },
        ],
        $and: [{status : true}]
    }).populate('category','name');

    res.json({
        results: products,
        total: products.length
    })
}



const search = (req, res = response) => {

    const { coleccion , termino } = req.params;

    if (!coleccionePermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `las colecciones permitidas son : ${coleccionePermitidas}`
        })
    }

    switch (coleccion) {
        case 'users':
            buscarUsuarios(termino , res)
            break;
        case 'categories':
            buscarCategorias(termino , res)
            break;
        case 'products':
            buscarProductos(termino , res)
            break;
    
        default:
            res.status(500).json({
                msg: 'Se le olvido validar la coleccion'
            })
            break;
    }

}


module.exports = {
    search,
}