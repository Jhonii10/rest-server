let user = null;
let socket = null;


const txtUid      = document.querySelector('#txtUid')
const txtMensaje  = document.querySelector('#txtMensaje')
const ulUsuarios  = document.querySelector('#ulUsuarios')
const ulMensajes  = document.querySelector('#ulMensajes')
const btnSalir    = document.querySelector('#btnSalir')


const validarJWT = async () => {

    
    
    const token = localStorage.getItem('token') || '';
    

    if (token.length < 12) {
        window.location = 'index.html';
        throw new Error("No hay token en el servidor");
    
    }

    
    const resp = await fetch('http://localhost:3000/api/auth',{
        method: 'GET',
        headers: {
            'x-token': token
        }
    });

    const { user: userDB , token : tokenDB} = await resp.json();
    
    localStorage.setItem('token', tokenDB)
    user = userDB;

    document.title = user.name;

    await conectarSocket();

}


const conectarSocket = async () => {

    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', () => {
        console.log('Conectado al servidor');
    })

    socket.on('disconnect', () => {
        console.log('Desconectado del servidor');
    })

    socket.on('recibir-mensajes', (mensajes) => {
        let mensajesHTML = '';
        mensajes.forEach((mensaje) => {

            mensajesHTML += `
                <li>
                    <p>
                        <span class="text-primary">
                        ${mensaje.name}
                        </span>
                        <span class="text-success">${mensaje.mensaje}</span>
                    </p>
                </li>
            `
        })

        ulMensajes.innerHTML = mensajesHTML;
    })

    socket.on('usuarios-activos', (usuarios) => {

       
        let usersHTML = '';
        usuarios.forEach((user) => {

            usersHTML += `
                <li>
                    <p>
                        <h5 class = "text-success">
                        ${user.name}
                        </h5>
                        <span class = "">${user.uid}</span>
                    </p>
                </li>
            `
        })

        ulUsuarios.innerHTML = usersHTML;
        
    })

    socket.on('mensaje-privado', ({de , mensaje}) => {
        
        
        let usersHTML = '';
    

        usersHTML += `
            <li>
                <p>
                    <h5 class = "text-success">
                    ${de}
                    </h5>
                    <span class = "">${mensaje}</span>
                </p>
            </li>
            `

        ulMensajes.innerHTML = usersHTML;
    })



}


txtMensaje.addEventListener('keyup', ({keyCode}) => {

    const mensaje = txtMensaje.value;
    const uid = txtUid.value;

    if (keyCode !== 13) {
        return;
    }

    if (mensaje.length === 0) {
        return;
    }

    socket.emit('enviar-mensaje', {mensaje , uid})

    txtMensaje.value = '';


})



const main = async () => {

    await validarJWT()

}

main()


// const socket = io();
