// Este modelo contiene todas las sucursales donde se almacenan productos
// Este modelo no esta en uso, ha sido embebido directamente en los otros 
// modelos para mejorar el procesamiento debido a que no es comun el cambio de este.

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var SucursalSchema = new Schema({
    nombre: {type: String, required: true},
    direccion: {type: {linea1:String,linea2:String,linea3:String}, default:{linea1:'',linea2:'',linea3:''}},
    telefono: {type: String,  default:''}
});

// pass Schema using module.exports
module.exports = mongoose.model('Sucursal',SucursalSchema);