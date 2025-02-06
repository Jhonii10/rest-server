const mongoose = require('mongoose');

const dbConnection = async()=>{

    try {

       await mongoose.connect( process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
       })

        console.log('base de datos en linea')
        
    } catch (error) {
        console.error(error)
        throw new Error('error al connectarse a la base de datos');

    }

}

module.exports = {
    dbConnection,
}