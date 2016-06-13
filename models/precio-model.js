// Este modelo contiene el historial de precios
// Registra una entrada cada vez que hay cambio del precio de algun producto


// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var PrecioSchema = new Schema({
    nombre: {type: String, required: true}, //nombre del producto +unidades+precentacion. ej: costal minerales 20kg 
    precio: {type: Number,  default:0},     //precio del producto
    tipo: {type: String, required: true, enum:['compra','venta']}, //tipo de precio
});

// pass Schema using module.exports
module.exports = mongoose.model('Precio',PrecioSchema);