const {Schema , model} = require('mongoose')

const UserShema = Schema({
    name: {
        type: String,
        required: [
            true,
            'El nombre es obligatorio'
        ]
    },
    email: {
        type: String,
        unique: true,
        required: [
            true,
            'El correo es obligatorio',
        ],
    },
    password: {
        type: String,
        required: [
            true,
            'La contraseña es obligatoria'
        ]
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE' , 'VENTAS_ROLE'],
        default: 'USER_ROLE'
    },
    status:{
        type:Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },

})


UserShema.methods.toJSON = function () {
    const {__v, password, ...user} = this.toObject();
    return user;
}


module.exports = model('User', UserShema)