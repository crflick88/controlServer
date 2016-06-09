//Este modelo contiene la informacion de todas las entradas registradas a cada sucursal

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model: Sucursal
var SucursalSchema = new Schema({
    nombre: {type: String, required: true},
    direccion: String,
    telefono: String
});

// set up a mongoose model
var EntradaSchema = new Schema({
    fecha: {type: Date, required: true, default: Date.now},
    cantidad: {type: Number, required: true},
    producto: mongoose.Schema.Types.ObjectId,
    sucursal: SucursalSchema
});

// pass Schema using module.exports
module.exports = mongoose.model('Entrada',EntradaSchema);