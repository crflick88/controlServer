// Este modelo contiene todo el inventario de las sucursales
// \\Este modelo ha sido desnormalizado dentro del modelo producto. 
// clave primaria: id

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//var Producto = require('../models/producto-model');
//var Sucursal = require('../models/sucursal-model');

// set up a mongoose model
var InventarioSchema = new Schema({
    cantidad: {type: Number, required: true},           //cantidad de productos, no importan las unidades ni la precentacion. ej: 10 costal de minerales 20kg
    producto: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Producto'},   //Object id de un producto
    //sucursal: {type: SucursalSchema, required: true}    //schema completo de una sucursal
    sucursal: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Sucursal'}   //Object id de una sucursal
});

// pass Schema using module.exports
module.exports = mongoose.model('Inventario',InventarioSchema);