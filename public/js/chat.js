let user = null;
let socket = null;


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

    const socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    return socket



}



const main = async () => {

    await validarJWT()

}

main()


// const socket = io();
