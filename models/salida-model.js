//Este modelo contiene la informacion de todas las salidas registradas a cada sucursal
//Nota: La comision en una cantidad en pesos que sera deducida del precio por unidad
//Nota: El tipo venta es una venta pagada en efectivo o con cheque de forma instantanea

 
// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model: Sucursal
var SucursalSchema = new Schema({
    nombre: {type: String, required: true},
    direccion: {type: {linea1:String,linea2:String,linea3:String}, default:{linea1:'',linea2:'',linea3:''}},
    telefono: {type: String,  default:''}
});

// set up a mongoose model
var SalidaSchema = new Schema({
    folio: {type: Number, required: true},
    fecha: {type: Date, required: true, default: Date.now},
    cantidad: {type: Number, required: true},
    producto: mongoose.Schema.Types.ObjectId,
    sucursal: SucursalSchema,
    precio: {type: Number, required: true},
    comision: {type: Number, required: true, default: 0},
    tipo: {type: String, required: true, enum: ['venta','credito','transferencia']}
});

// pass Schema using module.exports
module.exports = mongoose.model('Salida',SalidaSchema);