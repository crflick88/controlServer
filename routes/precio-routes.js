//Rutas del API para los cambios de precio

var express = require('express'),
    jwt     = require('express-jwt'),
    config  = require('../config'),
    moment  = require('moment-timezone');

var app = module.exports = express.Router();

var Precio = require('../models/precioHistorial-model');

var jwtCheck = jwt({
  secret: config.secret
});

//app.use('/precios', jwtCheck);


//retrieves prices in many ways 
app.get('/precios',function(req,res){
    
    var sort = "";
    if (req.query.hasOwnProperty('sort')){
        sort = req.query.sort;
        delete req.query["sort"];
    }

    Precio.find(req.query).sort(sort).exec(function(err,precios){
        if (err)
            res.status(500).send(err);
        else 
            res.status(200).json(precios);
    });

});

//Agrega un item al historial
app.post('/precios', function(req, res) {
    var precio = new Precio();
        
    precio.producto = req.body.producto;
    precio.precio = req.body.precio;
    precio.tipo = req.body.tipo.toLowerCase();;
    //using moment-timezone
    precio.fecha = moment(Date.now()).tz(moment.tz.guess()).format();

    precio.save(function(err,precio){
        if(err)
            return res.status(500).send(err);
            else{
                return res.status(201).send({success:true,message:'Cambio en el precio creado exitosamente.'});   
            }
    });
});


app.get('/precios/:precio_id',function(req,res){
    
    Precio.findById(req.params.precio_id,function(err,precio){
        if(err)
            res.status(500).send(err);
        else if(precio){
            //req.user = user;
            
            res.status(200).json(precio);
        }else
            res.status(404).send({success:false,message:'No se encontraron precios.'});
        
    });
    
});

app.delete('/precios/:precio_id',function(req,res) {
    Precio.remove({
        _id: req.params.precio_id
    }, function(err, precio){
        if (err)
            res.status(500).send(err);
        else    
            res.status(200).send({success:true,message:'Precio borrado exitosamente'});
            
    });
});

app.put('/precios/:precio_id',function(req,res){
    Precio.findByIdAndUpdate(req.params.precio_id,{$set:req.body},{new:true,runValidators:true}, function(err,precio){
        if(err)
            res.status(500).send(err);
        else if(!precio)
            res.status(404).send({success:false,message:'No se encontraron precios.'});
        else
            res.status(200).json(precio);
    });
});
