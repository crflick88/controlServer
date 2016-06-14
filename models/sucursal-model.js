// Este modelo contiene todas las sucursales donde se almacenan productos
// Este modelo no esta en uso, ha sido embebido directamente en los otros 
// modelos para mejorar el procesamiento debido a que no es comun el cambio de este.
// Este modelo fue desnormalizado en varios modelos.
// clave primaria: nombre


// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var SucursalSchema = new Schema({
    nombre: {type: String, required: true}, //Nombre de la sucursal
    direccion: {type: {linea1:String,linea2:String,linea3:String}, default:{linea1:'',linea2:'',linea3:''}}, //tres lineas de la direccion
    telefono: {type: String,  default:''}   //telefono de la sucursal
});

// pass Schema using module.exports
module.exports = mongoose.model('Sucursal',SucursalSchema);