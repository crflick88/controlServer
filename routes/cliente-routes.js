//Rutas del API para clientes

var express = require('express'),
    jwt     = require('express-jwt'),
    config  = require('../config');

var app = module.exports = express.Router();

var Cliente = require('../models/cliente-model');

var jwtCheck = jwt({
  secret: config.secret
});

//app.use('/clientes', jwtCheck);

app.get('/clientes',function(req,res){
    //var cliente = new Cliente();
    
    Cliente.find(function(err,clientes){
                if (err)
                    res.status(500).send(err);
                else
                    res.status(200).json(clientes);
            });
    
});

app.post('/clientes', function(req, res) {
    var cliente = new Cliente();
        
    cliente.nombre = req.body.nombre;
    cliente.contacto = req.body.contacto;
    cliente.direccion = req.body.direccion;
    cliente.email = req.body.email;
    cliente.telefono = req.body.telefono;
    cliente.rfc = req.body.rfc;
    
    Cliente.findOne({
            nombre:req.body.nombre
        },function(err,clienteFound){
            if(err)
                return res.status(500).send(err);
            else if(clienteFound)
                return res.status(400).send("Ese cliente ya existe.");
            else{
                cliente.save(function(err,cliente){
                    if(err)
                        return res.status(404).send(err);
                        else{
                            return res.status(201).send({success:true,message:'Cliente creado exitosamente.'});   
                        }
                });
            }
        }); 
            
 app.get('/clientes');   
});

app.get('/clientes/:cliente_id',function(req,res){
    
    Cliente.findById(req.params.cliente_id,function(err,cliente){
        if(err)
            res.status(500).send(err);
        else if(cliente){
            //req.user = user;
            
            res.status(200).json(cliente);
        }else
            res.status(404).send({success:false,message:'No se encontraron clientes.'});
        
    });
    
});

app.delete('/clientes/:cliente_id',function(req,res) {
    Cliente.remove({
        _id: req.params.cliente_id
    }, function(err, cliente){
        if (err)
            res.status(500).send(err);
        else    
            res.status(200).send({success:true,message:'Cliente borrado exitosamente'});
            
    }
    );
});

app.put('/clientes/:cliente_id',function(req,res){
    Cliente.findByIdAndUpdate(req.params.cliente_id,{$set:req.body},{new:true,runValidators:true}, function(err,cliente){
        if(err)
            res.status(500).send(err);
        else if(!cliente)
            res.status(404).send({success:false,message:'No se encontraron clientes.'});
        else
            res.status(200).json(cliente);
    });
});
