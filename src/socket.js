module.exports = (http) => {
    const io = require('socket.io')(http)
    let numUsers = 0;

    io.on('connection', (socket) => {

        //* Cuando se envia un nuevo msg
        socket.on('new-message', (msg) => { //Con esto establezco el nombre del evento que quiero que se escuche
            io.emit('new-message', msg) //Con esto hago que todxs lxs usuarixs que esten conectadxs se enteren de que hay un nuevo mensaje
        })

        //* Cuando alguien se desconecta
        socket.on('disconnect', () => {
            console.log('Usuario desconectado')
        })


        //* Cuando alguien está escribiendo
        socket.on('typing', (msg) => {
            io.emit('typing', msg)
        })

        socket.on('is-typing', (user) => {
            io.emit('is-typing', user)
        })

        //* Cuando alguien para de escribir
        socket.on('stop-typing', () => {
            socket.broadcast.emit('stop-typing', {
                username: socket.username
            })
        })
    })
}