const {Schema , model} = require('mongoose')

const CategorySchema = Schema({
    name : {
        type : String,
        required : [ true , 'El nombre es obligatorio'],
        unique : true
    },
    estado : {
        type : Boolean,
        default : true,
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
})




module.exports = model('Category', CategorySchema)