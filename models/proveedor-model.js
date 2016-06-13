//Este modelo contiene informacion de todos los Proveedores


// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var ProveedorSchema = new Schema({
    nombre: {type: String, required: true}, //Nombre del proveedor
    contacto: {type: String,  default:''},  //Nombre coloquial o persona referente a la empresa proveedor
    direccion: {type: {linea1:String,linea2:String,linea3:String}, default:{linea1:'',linea2:'',linea3:''}}, //tres lineas para direccion
    email: {type: String,  default:''},     //email del proveedor
    telefono: {type: String,  default:''},  //telefono del proveedor
    rfc: {type: String,  default:''}        //rfc del proveedor
});

// pass Schema using module.exports
module.exports = mongoose.model('Proveedor',ProveedorSchema);