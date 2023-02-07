const formAgregarProducto = document.getElementById('agregarProducto')
const socket = io.connect();

//------------------------------------------------------------------------------------

formAgregarProducto.addEventListener('submit', e => {
    e.preventDefault()
    const producto = {
        title: formAgregarProducto[0].value,
        price: formAgregarProducto[1].value,
        foto: formAgregarProducto[2].value,
        descripcion: formAgregarProducto[3].value,
        codigo: formAgregarProducto[4].value,
        stock: formAgregarProducto[5].value
    }
    socket.emit('update', producto);
    formAgregarProducto.reset()
})


socket.on('productos', productos => {
    makeHtmlTable(productos).then(html => {
        document.getElementById('productos').innerHTML = html
    })
});


function makeHtmlTable(productos) {
    return fetch('./views/lista.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            return html
        })
}

//-------------------------------------------------------------------------------------

