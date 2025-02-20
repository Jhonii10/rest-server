const { comprobarJWT } = require("../helpers/generetJWT");

const socketController = async ( socket ) => {

    const user = await comprobarJWT(socket.handshake.headers['x-token']);
    
    if (!user) {
        return socket.disconnect();
    }

    console.log('online', user.name);
    
    
}


module.exports = {
    socketController
}