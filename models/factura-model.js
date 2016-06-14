// Este modelo contiene informacion de todas las facturas expedidas y emitidas
// Nota: Es muy importante el 'tipo' de factura ya que eso determina si es factura expedida o emitida
// clave primaria: folio

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var FacturaSchema = new Schema({
    folio: {type: String, required: true, unique: true}, // folio de la factura, valor unico si es emitida por nosotros
    fecha: {type: Date, default: Date.now}, // fecha de emision, no es fecha actual cuando es de un proveedor
    nombre: {type: String, required: true}, // nombre del cliente / proveedor
    rfc: {type: String, required: true}, // rfc del cliente/proveedor
    tipo: {type: String, required: true, enum:['expedida','recibida']}, // expedida es emitida a un cliente, recibida es entregada por un proveedor
    productos:{type: [{ //arreglo con varios poductos vendidos
        cantidad: {type: Number, required: true}, // numero de unidades por producto
        unidad: {type: String, required: true, default: 'kilo'}, // unidades de medida
        descripcion: {type: String, required: true}, // descripcion del producto
        precio: {type: Number, required: true}, // precio por unidad
        iva:{type: Number, required: true} // % de iva
    }], required:true},    
    monto: {type: Number, required: true}, // monto total de venta ya con iva
    direccion: {type: {linea1:String,linea2:String,linea3:String}, default:{linea1:'',linea2:'',linea3:''}}
});

// pass Schema using module.exports
module.exports = mongoose.model('Factura',FacturaSchema);