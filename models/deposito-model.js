// Este modelo contiene los depositos hechos a la cuenta
// clave primaria: id

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FacturaExpedida = require('../models/facturaExpedia-model');

// set up a mongoose model
var DepositoSchema = new Schema({
    folio: {type: String, required: true},          //folio del deposito, numero de confirmacion de transferencia
    fecha: {type: Date, default: Date.now},          //fecha del deposito  
    monto: {type: Number, required: true},           //monto depositado
    facturaExpedida: {type: mongoose.Schema.Types.ObjectId, required:false, ref: 'FacturaExpedida'}
});

// pass Schema using module.exports
module.exports = mongoose.model('Deposito',DepositoSchema);