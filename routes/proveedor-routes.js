var express = require('express'),
    jwt     = require('express-jwt'),
    config  = require('../config');

var app = module.exports = express.Router();

var Proveedor = require('../models/proveedor-model');

var jwtCheck = jwt({
  secret: config.secret
});

//app.use('/proveedores', jwtCheck);

app.get('/proveedores',function(req,res){
    var proveedor = new Proveedor();
    
    Proveedor.find(function(err,proveedores){
                if (err)
                    res.send(err);
                
                res.status(200).json(proveedores);
            });
    
});

app.post('/proveedores', function(req, res) {
    var proveedor = new Proveedor();
        
    proveedor.nombre = req.body.nombre;
    proveedor.contacto = req.body.contacto;
    proveedor.direccion = req.body.direccion;
    proveedor.email = req.body.email;
    proveedor.telefono = req.body.telefono;
    proveedor.rfc = req.body.rfc;
    
    Proveedor.findOne({
            nombre:req.body.nombre
        },function(err,proveedorFound){
            //if(err)
                //return res.status(404).send(err);
                
            if(proveedorFound)
                return res.status(400).send("Ese proveedor ya existe.");
            else{
                proveedor.save(function(err,proveedor){
                    if(err)
                        return res.status(404).send(err);
                        else{
                            return res.status(201).send({success:true,message:'Proveedor creado exitosamente.'});   
                        }
                });
            }
        }); 
            
 app.get('/proveedores');   
});

app.get('/proveedores/:proveedor_id',function(req,res){
    
    Proveedor.findById(req.params.proveedor_id,function(err,proveedor){
        if(err)
            res.status(500).send(err);
        else if(proveedor){
            //req.user = user;
            
            res.status(200).json(proveedor);
        }else
            res.status(404).send({success:false,message:'No se encontraron proveedores.'});
        
    });
    
});

app.delete('/proveedores/:proveedor_id',function(req,res) {
    Proveedor.remove({
        _id: req.params.proveedor_id
    }, function(err, proveedor){
        if (err)
            res.status(500).send(err);
        else    
            res.status(200).send({success:true,message:'Proveedor borrado exitosamente'});
            
    }
    );
});

app.put('/proveedores/:proveedor_id',function(req,res){
    Proveedor.findByIdAndUpdate(req.params.proveedor_id,{$set:req.body},{new:true,runValidators:true}, function(err,proveedor){
        if(err)
            res.status(500).send(err);
        else
            res.status(200).json(proveedor);
    });
});
