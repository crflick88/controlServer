// Este modelo contiene todo el inventario de las sucursales
// Este modelo ha sido desnormalizado dentro del modelo producto. 
// clave primaria: id

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model: Sucursal
var SucursalSchema = new Schema({
    nombre: {type: String, required: true}, //Nombre de la sucursal
    direccion: {type: {linea1:String,linea2:String,linea3:String}, default:{linea1:'',linea2:'',linea3:''}}, //tres lineas de la direccion
    telefono: {type: String,  default:''}   //telefono de la sucursal
});

var Producto = require('../models/producto-model');

// set up a mongoose model
var InventarioSchema = new Schema({
    cantidad: {type: Number, required: true},           //cantidad de productos, no importan las unidades ni la precentacion. ej: costal de minerales 20kg
    producto: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Producto'},   //Object id de un producto
    sucursal: {type: SucursalSchema, required: true}    //schema completo de una sucursal
});

// pass Schema using module.exports
module.exports = mongoose.model('Inventario',InventarioSchema);