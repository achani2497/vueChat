const http = require('./app')
const port = process.env.PORT || 3000

http.listen(port, () =>{
    console.log(`Server levantado: 
http://localhost:`+port)
})