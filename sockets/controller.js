const { Socket } = require("socket.io");
const { comprobarJWT } = require("../helpers/generetJWT");
const { ChatMensajes } = require("../models/chat");


const chatMensajes = new ChatMensajes();

const socketController = async ( socket, io ) => {

    const user = await comprobarJWT(socket.handshake.headers['x-token']);
    
    if (!user) {
        return socket.disconnect();
    }

    chatMensajes.conectarUsuario(user);
    io.emit('usuarios-activos', chatMensajes.usuariosArr);
    socket.emit('recibir-mensajes', chatMensajes.ultimos10)

    socket.join(user.id); // global

    
    socket.on('disconnect', () => {
        chatMensajes.desconectarUsuario(user.id);
        io.emit('usuarios-activos', chatMensajes.usuariosArr);
    })

    socket.on('enviar-mensaje', ({mensaje, uid}) => {
        
        if(uid){
            socket.to(uid).emit('mensaje-privado', {de : user.name , mensaje})
        }else{
            chatMensajes.enviarMensaje(user.id, user.name, mensaje)
            io.emit('recibir-mensajes', chatMensajes.ultimos10)
        }
    })
    
    
}


module.exports = {
    socketController
}