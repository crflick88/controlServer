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
    var producto = new Producto();
    
    Producto.find({"sucursal":null},function(err,productos){
        if (err)
            res.send(err);
        
        res.status(200).json(productos);
    });
});

app.get('/productos/sucursal',function(req,res){
    var producto = new Producto();
    
    Producto.find({"sucursal":{$exists:true}},function(err,productos){
        if (err)
            res.send(err);
        
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
    producto.cantidad = req.body.cantidad;
    producto.sucursal = req.body.sucursal;
    
    Producto.findOne({
            nombre:req.body.nombre, presentacion: req.body.presentacion, unidades: req.body.unidades
        },function(err,productoFound){
            //if(err)
                //return res.status(404).send(err);
                
            if(productoFound)
                return res.status(400).send(productoFound.nombre+" "+productoFound.presentacion+productoFound.unidades+" ya existe.");
            else{
                producto.save(function(err,producto){
                    if(err)
                        return res.status(404).send(err);
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
        else
            res.status(200).json(producto);
    });
});
