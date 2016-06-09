//Este modelo contiene el catalogo de los productos de se manejan

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var ProductoSchema = new Schema({
    nombre: {type: String, required: true},
    unidades: Number,
    precio_venta: Number,
    precio_compra: Number
});

// pass Schema using module.exports
module.exports = mongoose.model('Producto',ProductoSchema);