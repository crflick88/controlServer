//Este modelo contiene informacion de todas las facturas expedidas y emitidas
//Nota: Es muy importante el 'tipo' de factura ya que eso determina si es factura expedida o emitida

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var FacturaSchema = new Schema({
    folio: {type: String, required: true},
    fecha: {type: Date, required: true, default: Date.now},
    monto: {type: Number, required: true},
    tipo: {type: String, required: true, enum:['expedida','recibida']},
    rfc: {type: String, required: true},
    nombre: {type: String, required: true},
    direccion: {type: String, required: true},
    email: String,
    telefono: String
});

// pass Schema using module.exports
module.exports = mongoose.model('Factura',FacturaSchema);