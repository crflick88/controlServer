//Este modelo contiene todos los creditos realizados a los cientes 

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var CreditoSchema = new Schema({
    fecha_entrega: {type: Date, required: true, default: Date.now},
    fecha_cobro: {type: Date, required: true, default: +new Date() + 14*24*60*60*1000},
    fecha_pago: {type: Date, required: false},
    estatus: {type: String, required: true, enum: ['pendiente','pagado'], default: 'pendiente'},
    cliente: mongoose.Schema.Types.ObjectId,
    salida: mongoose.Schema.Types.ObjectId,
});

// pass Schema using module.exports
module.exports = mongoose.model('Credito',CreditoSchema);