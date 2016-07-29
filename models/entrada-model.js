// Este modelo contiene la informacion de todas las entradas registradas a cada sucursal
// clave primaria: folio

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//var Proveedor = require('../models/proveedor-model');
//var Producto = require('../models/producto-model');
//var Sucursal = require('../models/sucursal-model');
//var FacturaRecibida = require('../models/facturaRecibida-model');

// set up a mongoose model
var EntradaSchema = new Schema({
    folio: {type: Number, unique: true, required: true},      //folio (id) de la entrada
    fecha: {type: Date, default: Date.now},     //fecha de la entrada a inventario    
    productos :{type:[{ //arreglo de productos que contienen info del producto y cantidad que entra
        cantidad: {type: Number, required: true},   //cantidad de productos (no importan las unidades ni las precentaciones) ej, costal minerales 20kg
        producto: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Producto'} //Object id de un producto
    }], required: true},
    //sucursal: {type: SucursalSchema, required: true}, //schema completo de sucursal
    sucursal: {type: mongoose.Schema.Types.ObjectId, required:true, ref: 'Sucursal'}, //referencia a un proveedor
    proveedor: {type: mongoose.Schema.Types.ObjectId, required:true, ref: 'Proveedor'}, //referencia a un proveedor
    facturaRecibida: {type: mongoose.Schema.Types.ObjectId, required:false, ref: 'FacturaRecibida'}
});

// pass Schema using module.exports
module.exports = mongoose.model('Entrada',EntradaSchema);