// Este modelo contiene los depositos hechos a la cuenta
// clave primaria: id

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Producto = require('../models/producto-model');
var Sucursal = require('../models/sucursal-model');

var FacturaExpedida = require('../models/facturaExpedia-model');

// set up a mongoose model
var InventarioSchema = new Schema({
    fecha: {type: Date, default: Date.now},             //fecha del conteo  
    cantidad: {type: Number, required: true},           //cantidad de productos, no importan las unidades ni la precentacion. ej: 10 costal de minerales 20kg
    producto: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Producto'},   //Object id de una factura expedida
    facturaExpedida: {type: mogoose.Schema.Types.ObjectId, required:false, ref: 'FacturaExpedida'}
});

// pass Schema using module.exports
module.exports = mongoose.model('Inventario',InventarioSchema);