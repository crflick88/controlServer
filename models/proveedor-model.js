//Este modelo contiene informacion de todos los Proveedores


// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var ProveedorSchema = new Schema({
    nombre: {type: String, required: true},
    contacto: {type: String,  default:''},
    direccion: {type: {linea1:String,linea2:String,linea3:String}, default:{linea1:'',linea2:'',linea3:''}},
    email: {type: String, default:''},
    telefono: {type: String, default:''},
    rfc: {type: String, default:''}
});

// pass Schema using module.exports
module.exports = mongoose.model('Proveedor',ProveedorSchema);