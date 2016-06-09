// Este modelo contiene todas las sucursales donde se almacenan productos
// Este modelo no esta en uso, ha sido embebido directamente en los otros 
// modelos para mejorar el procesamiento debido a que no es comun el cambio de este.

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var SucursalSchema = new Schema({
    nombre: {type: String, required: true},
    direccion: String,
    telefono: String
});

// pass Schema using module.exports
module.exports = mongoose.model('Sucursal',SucursalSchema);