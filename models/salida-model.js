// Este modelo contiene la informacion de todas las salidas registradas a cada sucursal
// Nota: La comision en una cantidad en pesos que sera deducida del precio por unidad
// Nota: El tipo venta es una venta pagada en efectivo o con cheque de forma instantanea
// clave primaria: folio

 
// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model: Sucursal
var SucursalSchema = new Schema({
    nombre: {type: String, required: true}, //Nombre de la sucursal
    direccion: {type: {linea1:String,linea2:String,linea3:String}, default:{linea1:'',linea2:'',linea3:''}}, //tres lineas de la direccion
    telefono: {type: String,  default:''}   //telefono de la sucursal
});

var Cliente = require('../models/cliente-model');
var Producto = require('../models/producto-model');

// set up a mongoose model
var SalidaSchema = new Schema({
    folio: {type: Number, required: true, unique: true},          //folio (id) de la salida de inventario
    fecha: {type: Date, default: Date.now},         //fecha de salida
    productos :{type:[{ //arreglo de productos que contienen info del producto y cantidad que entra
        cantidad: {type: Number, required: true},   //cantidad de productos (no importan las unidades ni las precentaciones) ej, costal minerales 20kg
        producto: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Producto'}, //referencia de un producto
        precio: {type: Number, required: true},     //precio total por producto
        comision: {type: Number, default: 0}        // comisione en pesos por producto
    }], required: true},
    sucursal: {type: SucursalSchema, required: true},// schema completo de una sucursal
    tipo: {type: String, required: true, enum: ['venta','credito','transferencia']}, //tipo de salida. si es credito se agrega un nuevo credito en la coleccion de creditos
    cliente: {type: mogoose.Schema.Types.ObjectId, required:true, ref: 'Cliente'}
});

// pass Schema using module.exports
module.exports = mongoose.model('Salida',SalidaSchema);