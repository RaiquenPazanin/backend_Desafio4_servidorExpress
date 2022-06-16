const express = require('express');
const app = express();
const puerto = 8080;
const rutas = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/html', express.static(__dirname + '/html'));

app.use('/api', rutas)

app.listen(puerto, err => {
    if(err) {
        console.log(`Hubo un error al inciar el servidor ${err}`)
    } else {
        console.log(`Servidor escuchando el puerto: ${puerto}`)
    }
})