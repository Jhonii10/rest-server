const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');
const { socketController } = require('../sockets/controller');


class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.userRouter = '/api/users';
        this.authPath   = '/api/auth';
        this.categoriesRouter = '/api/categories';
        this.productsRouter = '/api/products';
        this.searchRouter = '/api/search';
        this.uploadsRouter = '/api/uploads';

        this.connectDB();

        this.middleware();

        this.router();

        this.sockets();

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

    sockets(){

        this.io.on('connection', socketController )
    }

    listen(){
        this.server.listen(process.env.PORT, () => {
          console.log(`Servidor corriendo en el puerto: `, process.env.PORT)
        });
    }



}


module.exports = {
    Server
}




