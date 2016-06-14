// Este modelo contiene informacion de todos los clientes
// clave primaria: id/nombre 
// valores unicos: rfc no se repite

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var ClienteSchema = new Schema({
    nombre: {type: String, required: true}, //Nombre del cliente
    contacto: {type: String,  default:''},  //Nombre coloquial o persona referente a la empresa cliente
    direccion: {type: {linea1:String,linea2:String,linea3:String}, default:{linea1:'',linea2:'',linea3:''}}, //tres lineas para direccion
    email: {type: String,  default:''},     //email del cliente
    telefono: {type: String,  default:''},  //telefono del cliente
    rfc: {type: String, unique: true,  default:''}        //rfc del cliente
});

// pass Schema using module.exports
module.exports = mongoose.model('Cliente',ClienteSchema);