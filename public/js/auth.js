const formularioLogin = document.querySelector('form');


async function handleCredentialResponse(response) {
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.

    try {
        const {data} = await axios.post('http://localhost:3000/api/auth/google',{
             id_token:response.credential
        })
        
        localStorage.setItem('token', data.token);

        window.location = 'chat.html'

    } catch (error) {
       console.error(error)
    };

    


}

const button = document.getElementById('google_signout');

button.onclick = () => {

    google.accounts.id.disableAutoSelect();

    google.accounts.id.revoke( localStorage.getItem('email'), () =>{
        localStorage.clear();
        location.reload(true);
    })

}


 formularioLogin.addEventListener('submit', async e =>{
    e.preventDefault();
    const formData = {};

    for (let el of formularioLogin.elements) {
        if (el.name.length > 0) {
            formData[el.name] = el.value;
        }
        
    }
    
    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la autenticación');
        }

        const data = await response.json();
        const { token } = data;
        localStorage.setItem('token', token);
        window.location = 'chat.html'
        
    } catch (error) {
        console.log("Error en la autenticación:", error.message);
    }
    



    

})