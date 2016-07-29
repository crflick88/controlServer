//Rutas del API para sucursales

var express = require('express'),
    jwt     = require('express-jwt'),
    config  = require('../config');

var app = module.exports = express.Router();

var Sucursal = require('../models/sucursal-model');

var jwtCheck = jwt({
  secret: config.secret
});

//app.use('/sucursales', jwtCheck);

app.get('/sucursales',function(req,res){
    var sort = "";
    if (req.query.hasOwnProperty('sort')){
        sort = req.query.sort;
        delete req.query["sort"];
    }

    Sucursal.find(req.query).sort(sort).exec(function(err,sucursales){
        if (err)
            res.status(500).send(err);
        else 
            res.status(200).json(sucursales);
    });
    
});

app.post('/sucursales', function(req, res) {
    var sucursal = new Sucursal();
        
    sucursal.nombre = req.body.nombre;
    sucursal.direccion = req.body.direccion;
    sucursal.telefono = req.body.telefono;
    
    Sucursal.findOne({
            nombre:req.body.nombre
        },function(err,sucursalFound){
            if(err)
                return res.status(500).send(err);
            else if(sucursalFound)
                return res.status(400).send("Esa sucursal ya existe.");
            else{
                sucursal.save(function(err,sucursal){
                    if(err)
                        return res.status(404).send(err);
                        else{
                            return res.status(201).send({success:true,message:'Sucursal creada exitosamente.'});   
                        }
                });
            }
        }); 
            
 app.get('/sucursales');   
});

app.get('/sucursales/:sucursal_id',function(req,res){
    
    Sucursal.findById(req.params.sucursal_id,function(err,sucursal){
        if(err)
            res.status(500).send(err);
        else if(sucursal){
            //req.user = user;
            
            res.status(200).json(sucursal);
        }else
            res.status(404).send({success:false,message:'No se encontraron sucursales.'});
        
    });
    
});

app.delete('/sucursales/:sucursal_id',function(req,res) {
    Sucursal.remove({
        _id: req.params.sucursal_id
    }, function(err, sucursal){
        if (err)
            res.status(500).send(err);
        else    
            res.status(200).send({success:true,message:'Sucursal borrado exitosamente'});
            
    }
    );
});

app.put('/sucursales/:sucursal_id',function(req,res){
    Sucursal.findByIdAndUpdate(req.params.sucursal_id,{$set:req.body},{new:true,runValidators:true}, function(err,sucursal){
        if(err)
            res.status(500).send(err);
        else if(!sucursal)
            res.status(404).send({success:false,message:'No se encontraron sucursales.'});
        else
            res.status(200).json(sucursal);
    });
});
