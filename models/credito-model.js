// Este modelo contiene todos los creditos realizados a los cientes 
// clave primaria: folio

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cliente = require('../models/clientes-model');
var Salida = require('../models/salida-model');

// set up a mongoose model
var CreditoSchema = new Schema({
    folio: {type: Number, required: true, unique: true},      //folio (id) del  credito
    fecha_entrega: {type: Date, default: Date.now}, //fecha de entrega del material al cliente
    fecha_cobro: {type: Date, default: +new Date() + 14*24*60*60*1000}, //fecha en que debe ser cobrado el credito. dos semanas despues de la entrega
    fecha_pago: {type: Date, required: false},  //fecha en que se efectuo el pago
    estatus: {type: String, enum: ['pendiente','pagado'], default: 'pendiente'}, //estatus del pago
    cliente: {type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Cliente'},    //object id del cliente
    salida: {type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Salida'}     //object id de la salida
});

// pass Schema using module.exports
module.exports = mongoose.model('Credito',CreditoSchema);