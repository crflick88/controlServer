// Este modelo contiene el historial de precios
// Registra una entrada cada vez que hay cambio del precio de algun producto
//clave primaria: id


// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//var Producto = require('../models/producto-model');

// set up a mongoose model
var PrecioSchema = new Schema({
    producto: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Producto'}, //Object id de un producto
    precio: {type: Number,  default:0},         //precio del producto
    fecha:  {type: Date, default: Date.now},    //fecha en que cambia el precio  
    tipo: {type: String, required: true, enum:['compra','venta']} //tipo de precio
});

// pass Schema using module.exports
module.exports = mongoose.model('Precio',PrecioSchema);