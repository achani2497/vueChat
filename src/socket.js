module.exports = (http) => {
    const io = require('socket.io')(http)

    io.on('connection', (socket) => {
        console.log('Usuario conectado');
        socket.on('new-message', (msg) => { //Con esto establezco el nombre del evento que quiero que se escuche
            io.emit('new-message', msg) //Con esto hago que todxs lxs usuarixs que esten conectadxs se enteren de que hay un nuevo mensaje
        })
        socket.on('disconnect', () => {
            console.log('Usuario desconectado')
        })
    })
}