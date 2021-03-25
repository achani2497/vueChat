const express = require('express')
const app = express()
const http = require('http').createServer(app)
const socket = require('./socket')
socket(http)

//* Con esto le indico al sv donde van a estar mis archivos estaticos
app.use(express.static(__dirname+'/../public'));

module.exports = http