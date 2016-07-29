//Rutas del API para productos

var express = require('express'),
    jwt     = require('express-jwt'),
    config  = require('../config');

var app = module.exports = express.Router();

var Producto = require('../models/producto-model');

var jwtCheck = jwt({
  secret: config.secret
});

//app.use('/productos', jwtCheck);

app.get('/productos',function(req,res){
    var sort = "";
    if (req.query.hasOwnProperty('sort')){
        sort = req.query.sort;
        delete req.query["sort"];
    }

    Producto.find(req.query).sort(sort).exec(function(err,productos){
        if (err)
            res.status(500).send(err);
        else 
            res.status(200).json(productos);
    });
});

app.post('/productos', function(req, res) {
    var producto = new Producto();
        
    producto.nombre = req.body.nombre;
    producto.unidades = req.body.unidades;
    producto.presentacion = req.body.presentacion;
    producto.precio_venta = req.body.precio_venta;
    producto.precio_compra = req.body.precio_compra;
    //producto.cantidad = req.body.cantidad;
    producto.iva = req.body.iva;
    
    Producto.findOne({
            nombre:req.body.nombre, presentacion: req.body.presentacion, unidades: req.body.unidades
        },function(err,productoFound){
            if(err)
                return res.status(500).send(err);
            else if(productoFound)
                return res.status(400).send(productoFound.nombre+" "+productoFound.presentacion+productoFound.unidades+" ya existe.");
            else{
                producto.save(function(err,producto){
                    if(err)
                        return res.status(500).send(err);
                        else{
                            return res.status(201).send({success:true,message:'Producto creado exitosamente.'});   
                        }
                });
            }
        }); 
            
 app.get('/productos');   
});

app.get('/productos/:producto_id',function(req,res){
    
    Producto.findById(req.params.producto_id,function(err,producto){
        if(err)
            res.status(500).send(err);
        else if(producto){
            //req.user = user;
            
            res.status(200).json(producto);
        }else
            res.status(404).send({success:false,message:'No se encontraron productos.'});
        
    });
    
});

app.delete('/productos/:producto_id',function(req,res) {
    Producto.remove({
        _id: req.params.producto_id
    }, function(err, producto){
        if (err)
            res.status(500).send(err);
        else    
            res.status(200).send({success:true,message:'Producto borrado exitosamente'});
            
    }
    );
});

app.put('/productos/:producto_id',function(req,res){
    Producto.findByIdAndUpdate(req.params.producto_id,{$set:req.body},{new:true,runValidators:true}, function(err,producto){
        if(err)
            res.status(500).send(err);
        else if(!producto)
            res.status(404).send({success:false,message:'No se encontraron productos.'});
        else
            res.status(200).json(producto);
    });
});
