//Rutas del API para el inventario de productos
var express = require('express'),
    jwt     = require('express-jwt'),
    config  = require('../config');

var app = module.exports = express.Router();

//var Producto = require('../models/inventario-model');
var Inventario = require('../models/inventario-model');

var jwtCheck = jwt({
  secret: config.secret
});

//app.use('/inventarios', jwtCheck);

app.get('/inventarios',function(req,res){
    var sort = "";
    if (req.query.hasOwnProperty('sort')){
        sort = req.query.sort;
        delete req.query["sort"];
    }

    Inventario.find(req.query).sort(sort).exec(function(err,inventarios){
        if (err)
            res.status(500).send(err);
        else 
            res.status(200).json(inventarios);
    });
});

//adds to an existing entry
app.post('/inventarios', function(req, res) {
    var inventario = new Inventario();
        
    inventario.producto = req.body.producto;
    inventario.sucursal = req.body.sucursal;
    inventario.cantidad = req.body.cantidad;
    
    Inventario.findOne({
            producto:req.body.producto, sucursal: req.body.sucursal
        },function(err,entry){
            if(err)
                return res.status(500).send(err);
            else if(entry){
                entry.cantidad+=inventario.cantidad;

                entry.save(function(err,entry){
                    if(err)
                        return res.status(500).send(err);
                    else{
                        return res.status(201).send({success:true,message:'Inventario actualizado exitosamente.'});   
                    }
                });
            }
            else{
                inventario.save(function(err,inventario){
                    if(err)
                        return res.status(500).send(err);
                    else{
                        return res.status(201).send({success:true,message:'Entrada registrada exitosamente.'});   
                    }
                });
            }
        }); 
            
 app.get('/inventarios');   
});

app.delete('/inventarios',function(req,res) {
    Inventario.remove({
        producto:req.body.producto, sucursal: req.body.sucursal
    }, function(err, inventario){
        if (err)
            res.status(500).send(err);
        else    
            res.status(200).send({success:true,message:'Entrada borrada del inventario exitosamente'});
            
    }
    );
});

app.put('/inventarios',function(req,res){
    Inventario.findOne({
        producto:req.body.producto, sucursal: req.body.sucursal
    },function(err, inventario){
        if(err)
            return res.status(500).send(err);
        else if(!inventario)
            res.status(404).send({success:false,message:'No se encontraron entradas.'});
        else{
            inventario.cantidad = req.body.cantidad;
            inventario.save(function (err) {
                if (err) 
                    return res.status(500).send(err);
                else 
                	res.status(200).json(inventario);
            });           
        } 
    });

});
