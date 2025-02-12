const { response, request } = require("express");
const { Category } = require("../models");


const obtenerCategorias = async ( req = request , res = response ) => {

    const {desde = 0 , limite = 5} = req.query;
    const query = { estado: true };


    try {

        const categorias = await Category.find(query).populate("user", "name")
        .skip(Number(desde))
        .limit(Number(limite));

        const totalCategorias = await Category.countDocuments(query);

        return res.status(200).json({
            totalCategorias,
            categorias
        })

    } catch (error) {
        return res.status(400).json({
            msg: 'Error al obtener categorias',
        })
    }

}

const ObtenerCategoria = async ( req = request , res = response) => {

    const {id} = req.params;
    
    try {
        
        const categoria = await Category.findById(id).populate("user", "name");

        if (!categoria) {
            return res.status(404).json({
                msg: 'Categoria no encontrada',
            })
        }

        res.status(200).json({
            categoria
        })
    } catch (error) {
        return res.status(400).json({
            msg: 'Error al obtener categoria',
        })
    }

}

const crearCategoria = async (req, res = response) => {

    const name = req.body.name.toUpperCase();

    const categoriaDB = await   Category.findOne({name});

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${name}, ya existe`,
        })
    }

    const data = {
        name,
        user: req.user._id,
    }

    const category = new Category(data);

    await category.save();

    res.status(201).json({
        msg: 'La categoria se creo con exito',
        category
    })

}


const actualizarCategoria = async ( req = request , res = response) => {

    const {id} = req.params;
    const {_id, __v, estado, user, ...rest} = req.body;
     
    try {
        
        const categoriaId = await Category.findById(id)

        
        rest.name = rest.name.toUpperCase()
        rest.user = req.user._id;

        if (!categoriaId) {
            return res.status(404).json({
                msg: 'Categoria no encontrada',
            })
        }

         const categoria = await Category.findByIdAndUpdate(id, rest,  {new: true});
           
            res.json({
                message: 'categoria actualizada exitosamente',
                categoria
            })
    } catch (error) {
        return res.status(400).json({
            msg: 'Error al actualizar categoria',
        })
    }



}

const borrarCategoria = async (req = request , res = response) => {

    const {id} = req.params;

    try {
        
        const deleteID = await Category.findByIdAndUpdate(id, {estado : false}, {new: true});
        
        res.json({
            message: 'categoria eliminada exitosamente',
            deleteID
        })

    } catch (error) {
        return res.status(400).json({
            msg: 'Error al eliminar categoria',
        })
    }
}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    ObtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}