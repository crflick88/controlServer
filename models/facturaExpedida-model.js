// Este modelo contiene informacion de todas las facturas expedidas
// \\Nota: Es muy importante el 'tipo' de factura ya que eso determina si es factura expedida o emitida
// clave primaria: folio

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cliente = require('../models/cliente-model');
var Producto = require('../models/producto-model');

// set up a mongoose model
var FacturaExpedidaSchema = new Schema({
    folio: {type: String, required: true, unique: true}, // folio de la factura, valor unico si es emitida por nosotros
    fecha: {type: Date, default: Date.now}, // fecha de remision
    cliente: {type: mongoose.Schema.Types.ObjectId, required:true, ref: 'Cliente'}, //referencia a un proveedor
    productos: {type: [{ //arreglo de productos que contienen info del producto y cantidad que entra
        cantidad: {type: Number, required: true},   //cantidad de productos (no importan las unidades ni las precentaciones) ej, costal minerales 20kg
        producto: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Producto'}, //Object id de un producto
        iva: {type: Number, required: true}, //iva de cada producto 
        precio: {type: Number, required: true} //precio en el que fue vendido el producto, puede ser diferente al precio en coleccion producto
    }], required: true},    
    monto: {type: Number, required: true} // monto total de venta ya con iva
});

// pass Schema using module.exports
module.exports = mongoose.model('FacturaExpedida',FacturaExpedidaSchema);


