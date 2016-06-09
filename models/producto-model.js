//Este modelo contiene el catalogo de los productos de se manejan

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var ProductoSchema = new Schema({
    nombre: {type: String, required: true},
    unidades: {type: String, required: true, default:'kilo'},
    presentacion: {type: Number, required: true},
    precio_venta: {type: Number, required: true, default: 0.0},
    precio_compra: {type: Number, required: true, default: 0.0}
});

// pass Schema using module.exports
module.exports = mongoose.model('Producto',ProductoSchema);