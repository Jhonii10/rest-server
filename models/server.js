const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');


class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userRouter = '/api/users';
        this.authPath   = '/api/auth';
        this.categoriesRouter = '/api/categories';
        this.productsRouter = '/api/products';
        this.searchRouter = '/api/search';
        this.uploadsRouter = '/api/uploads';

        this.connectDB();

        this.middleware();

        this.router();

    }

    async connectDB(){
        await dbConnection();
    }

    middleware(){
        
        this.app.use(cors())

        this.app.use(express.json());

        this.app.use(express.static('public'))

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp',
            createParentPath: true
        }))

    }

    router(){
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.userRouter, require('../routes/user'))
        this.app.use(this.categoriesRouter, require('../routes/categories'))
        this.app.use(this.productsRouter, require('../routes/products'))
        this.app.use(this.searchRouter, require('../routes/search'))
        this.app.use(this.uploadsRouter, require('../routes/uploads'))

    }

    listen(){
        this.app.listen(process.env.PORT, () => {
          console.log(`Servidor corriendo en el puerto: `, process.env.PORT)
        });
    }



}


module.exports = {
    Server
}




