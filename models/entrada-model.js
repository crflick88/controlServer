//Este modelo contiene la informacion de todas las entradas registradas a cada sucursal


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
var EntradaSchema = new Schema({
    folio: {type: Number, required: true},      //folio (id) de la entrada
    fecha: {type: Date, default: Date.now},     //fecha de la entrada a inventario    
    productos :{type:[{ //arreglo de productos que contienen info del producto y cantidad que entra
        cantidad: {type: Number, required: true},   //cantidad de productos (no importan las unidades ni las precentaciones) ej, costal minerales 20kg
        producto: {type: mongoose.Schema.Types.ObjectId, required: true} //Object id de un producto
    }], required: true},
    sucursal: SucursalSchema                    //schema completo de sucursal
});

// pass Schema using module.exports
module.exports = mongoose.model('Entrada',EntradaSchema);