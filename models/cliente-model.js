//Este modelo contiene informacion de todos los clientes

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var ClienteSchema = new Schema({
    nombre: {type: String, required: true},
    contacto: String,
    direccion: String,
    email: String,
    telefono: String,
    rfc: String
});

// pass Schema using module.exports
module.exports = mongoose.model('Cliente',ClienteSchema);