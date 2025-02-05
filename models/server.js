const express = require('express');
const cors = require('cors');


class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userRouter = '/api/users'
        this.middleware();
        this.router();

    }

    middleware(){
        
        this.app.use(cors())

        this.app.use(express.json());

        this.app.use(express.static('public'))

    }

    router(){

        this.app.use(this.userRouter, require('../routes/user'))

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




