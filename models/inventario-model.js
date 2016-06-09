// Este modelo contiene todo el inventario de las sucursales

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model: Sucursal
var SucursalSchema = new Schema({
    nombre: {type: String, required: true},
    direccion: String,
    telefono: String
});

// set up a mongoose model
var InventarioSchema = new Schema({
    cantidad: {type: Number, required: true},
    producto: mongoose.Schema.Types.ObjectId,
    sucursal: SucursalSchema
});

// pass Schema using module.exports
module.exports = mongoose.model('Inventario',InventarioSchema);