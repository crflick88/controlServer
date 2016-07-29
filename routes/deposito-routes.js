//Rutas del API para los cambios de deposito

var express = require('express'),
    jwt     = require('express-jwt'),
    config  = require('../config'),
    moment  = require('moment-timezone');

var app = module.exports = express.Router();

var Deposito = require('../models/deposito-model');

var jwtCheck = jwt({
  secret: config.secret
});

//app.use('/depositos', jwtCheck);

//retrieves prices in many ways 
app.get('/depositos',function(req,res){
    
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

    Deposito.find(req.query).sort(sort).exec(function(err,depositos){
        if (err)
            res.status(500).send(err);
        else 
            res.status(200).json(depositos);
    });

});

//Agrega un item al historial
app.post('/depositos', function(req, res) {
    var deposito = new Deposito();
        
    deposito.folio = req.body.folio;
    deposito.fecha = req.body.fecha;
    deposito.monto = req.body.monto;
    deposito.facturaExpedida = req.body.facturaExpedida;

    deposito.save(function(err,deposito){
        if(err)
            return res.status(500).send(err);
            else{
                return res.status(201).send({success:true,message:'Deposito creado exitosamente.'});   
            }
    });
});


app.get('/depositos/:deposito_id',function(req,res){
    
    Deposito.findById(req.params.deposito_id,function(err,deposito){
        if(err)
            res.status(500).send(err);
        else if(deposito){
            //req.user = user;
            
            res.status(200).json(deposito);
        }else
            res.status(404).send({success:false,message:'No se encontraron depositos.'});
        
    });
    
});

app.delete('/depositos/:deposito_id',function(req,res) {
    Deposito.remove({
        _id: req.params.deposito_id
    }, function(err, deposito){
        if (err)
            res.status(500).send(err);
        else    
            res.status(200).send({success:true,message:'Deposito borrado exitosamente'});
            
    });
});

app.put('/depositos/:deposito_id',function(req,res){
    Deposito.findByIdAndUpdate(req.params.deposito_id,{$set:req.body},{new:true,runValidators:true}, function(err,deposito){
        if(err)
            res.status(500).send(err);
        else if(!deposito)
            res.status(404).send({success:false,message:'No se encontraron depositos.'});
        else
            res.status(200).json(deposito);
    });
});
