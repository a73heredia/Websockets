console.log('Ale!!!!!!!!!!!!!!');

const socketClient = io();

let user;
Swal.fire({
    title: 'Hola usuario',
    text: 'Bienvenido, Ingresa tu Usuario',
    input: 'text'
}).then(response => {
    //console.log(response);
    user = response.value;

})

const campo = document.getElementById('messsageField');

campo.addEventListener('keydown', (evt) => {

    if (evt.key === 'Enter') {
        socketClient.emit('message', {
            userName: user,
            message: campo.value
        });
    }
})

const messageContainer = document.getElementById('messageContainer');

socketClient.on('history', (data) => {
    let elementos = '';
    data.forEach(el => {
        elementos = elementos + `<p><strong>${el.userName}</strong>: ${el.message}</p>`
    })
    messageContainer.innerHTML = elementos;
})

socketClient.on('newUsser', () => {
    Swal.fire({
        text: 'nuevo usuario conectado',
        toas: true
    })
});