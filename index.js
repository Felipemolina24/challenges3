const express = require('express')
require('dotenv').config()
const {dbConnection} = require('./database/config')
const cors = require('cors')



//crear Express App
const app = express()

//Base de datos

dbConnection();

app.use( cors() )

app.use( express.static('public'))

//Lectura y parseo del body
app.use( express.json())

//Rutas
app.use('/api/auth', require('./routes/auth'))



//puerto 4000
app.listen(process.env.PORT, () =>{
    console.log('Servidor corriendo en puerto', process.env.PORT);
})

