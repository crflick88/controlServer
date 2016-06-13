//Este modelo contiene el catalogo de los productos de se manejan


// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var ProductoSchema = new Schema({
    nombre: {type: String, required: true},         //nombre del producto
    unidades: {type: String, default:'kg'},         //tipo de unidades. kg, gr, lb, unidades, etc
    presentacion: {type: Number, required: true},   //cantidad de unidades
    precio_venta: {type: Number, default: 0.0},     //precio a la venta por una unidad
    precio_compra: {type: Number, default: 0.0}     //precio a la compra por una unidad
});

// pass Schema using module.exports
module.exports = mongoose.model('Producto',ProductoSchema);