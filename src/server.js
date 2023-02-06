const morgan = require('morgan');
const express = require('express');
const { Server: HTTPServer } = require('http')
const { Server: IOServer } = require('socket.io')

const productsRouter = require("./routes/product")
const { connectToDb } = require("./config/connectToDb") 

const app = express();

const httpServer = new HTTPServer(app)
const io = new IOServer(httpServer)

const { products, chat } = require('./contenedor')


//Settings
app.set('port', process.env.PORT || 8080)
app.set('json spaces', 2)

//Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('./public'))

//Starting the server
// httpServer.listen(8080, ()=> {
//     console.log('Server On')
// })

const PORT = 8080
const server = httpServer.listen(PORT, () => {
    connectToDb("mongo")
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))


//Routes
app.use("/api/productos", productsRouter)

//websocket
io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');

    // carga inicial de productos
    socket.emit('productos', await products.getAll());

    // actualizacion de productos
    socket.on('update', async producto => {
        products.save(producto)
        io.sockets.emit('productos', await products.getAll());
    })

    // carga inicial de mensajes
    socket.emit('mensajes', await chat.getAll());

    // actualizacion de mensajes
    socket.on('nuevoMensaje', async mensaje => {
        mensaje.date = new Date().toLocaleString()
        await chat.save(mensaje)
        io.sockets.emit('mensajes', await chat.getAll());
    })
});




