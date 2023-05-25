const { connect } = require('http2')
const mongoose = require('mongoose')

const dbConnection = async() =>{
    try {
        mongoose.connect(process.env.DB_CONNECTION, {
            autoIndex: true
        })
        
        console.log('DB Online');

    }catch(error) {
        console.log(error);
        throw new Error('Error al conectar en BD')
    }
}

module.exports = {dbConnection}