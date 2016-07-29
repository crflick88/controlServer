//Rutas del API para los cambios de conteo

var express = require('express'),
    jwt     = require('express-jwt'),
    config  = require('../config'),
    moment  = require('moment-timezone');

var app = module.exports = express.Router();

var Conteo = require('../models/inventarioConteo-model');

var jwtCheck = jwt({
  secret: config.secret
});

//app.use('/conteos', jwtCheck);

//retrieves prices in many ways 
app.get('/conteos',function(req,res){
    
    //property as sort
    var sort = "";
    if (req.query.hasOwnProperty('sort')){
        sort = req.query.sort;
        delete req.query["sort"];
    }

    //search by date
    if (req.query.hasOwnProperty('fecha')){
        var today = moment(req.query.fecha).startOf('day');
        var tomorrow = moment(today).add(1, 'days');
        
        var fecha = 
        {
            "$gte": today.toDate(),
            "$lt": tomorrow.toDate()
        };

        delete req.query["fecha"];

        req.query.fecha = fecha;
    }

    Conteo.find(req.query).sort(sort).exec(function(err,conteos){
        if (err)
            res.status(500).send(err);
        else 
            res.status(200).json(conteos);
    });

});

//Agrega un item al historial
app.post('/conteos', function(req, res) {
    var conteo = new Conteo();
        
    conteo.productos = req.body.productos;
    conteo.sucursal = req.body.sucursal;

    //using moment-timezone
    conteo.fecha = moment(Date.now()).tz(moment.tz.guess()).format();

    conteo.save(function(err,conteo){
        if(err)
            return res.status(500).send(err);
            else{
                return res.status(201).send({success:true,message:'Conteo creado exitosamente.'});   
            }
    });
});


app.get('/conteos/:conteo_id',function(req,res){
    
    Conteo.findById(req.params.conteo_id,function(err,conteo){
        if(err)
            res.status(500).send(err);
        else if(conteo){
            //req.user = user;
            
            res.status(200).json(conteo);
        }else
            res.status(404).send({success:false,message:'No se encontraron conteos.'});
        
    });
    
});

app.delete('/conteos/:conteo_id',function(req,res) {
    Conteo.remove({
        _id: req.params.conteo_id
    }, function(err, conteo){
        if (err)
            res.status(500).send(err);
        else    
            res.status(200).send({success:true,message:'Conteo borrado exitosamente'});
            
    });
});

app.put('/conteos/:conteo_id',function(req,res){
    Conteo.findByIdAndUpdate(req.params.conteo_id,{$set:req.body},{new:true,runValidators:true}, function(err,conteo){
        if(err)
            res.status(500).send(err);
        else if(!conteo)
            res.status(404).send({success:false,message:'No se encontraron conteos.'});
        else
            res.status(200).json(conteo);
    });
});
