//Este modelo contiene el catalogo de los productos que se manejan
//clave primaria: nombre producto + unidades + precentacion     \\+ sucursal.nombre
//  \\nota: la sucursal puede estar en blanco, en ese caso solo es catalog


// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model: Sucursal
var SucursalSchema = new Schema({
    nombre: {type: String, required: true}, //Nombre de la sucursal
    direccion: {type: {linea1:String,linea2:String,linea3:String}, default:{linea1:'',linea2:'',linea3:''}}, //tres lineas de la direccion
    telefono: {type: String,  default:''}   //telefono de la sucursal
});

// set up a mongoose model
var ProductoSchema = new Schema({
    nombre: {type: String, required: true},         //nombre del producto
    unidades: {type: String, default:'kg'},         //tipo de unidades. kg, gr, lb, unidades, etc
    presentacion: {type: Number, required: true},   //cantidad de unidades
    //cantidad: {type: Number, default: 0},           //cantidad de productos, no importan las unidades ni la precentacion. ej: costal de minerales 20kg
    iva: {type: Number, required: true},            //cantidad de iva
    precio_venta: {type: Number, default: 0.0},     //precio a la venta por una unidad
    precio_compra: {type: Number, default: 0.0}//,    //precio a la compra por una unidad
    //sucursal: {type: SucursalSchema, required: false}//schema completo de una sucursal
});

// pass Schema using module.exports
module.exports = mongoose.model('Producto',ProductoSchema);