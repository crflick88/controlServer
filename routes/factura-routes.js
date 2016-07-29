//Rutas del API para Facturas

var express = require('express'),
    jwt     = require('express-jwt'),
    config  = require('../config'),
    moment  = require('moment-timezone');

var app = module.exports = express.Router();

var FacturaExpedida = require('../models/facturaExpedida-model');
var FacturaRecibida = require('../models/facturaRecibida-model');

var Producto = require('../models/producto-model');

var jwtCheck = jwt({
  secret: config.secret
});

//app.use('/faturas', jwtCheck);

app.get('/facturas/expedidas',function(req,res){
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

    FacturaExpedida.find(req.query).sort(sort).exec(function(err,facturas){
        if (err)
            res.status(500).send(err);
        else 
            res.status(200).json(facturas);
    });
    
});

app.get('/facturas/recibidas',function(req,res){
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

    FacturaRecibida.find(req.query).sort(sort).exec(function(err,facturas){
        if (err)
            res.status(500).send(err);
        else 
            res.status(200).json(facturas);
    });
    
});

app.post('/facturas/expedidas', function(req, res) {
    var factura = new FacturaExpedida();
        
    factura.folio = req.body.folio;
    factura.cliente = req.body.cliente;
    factura.productos = req.body.productos;
    
    FacturaExpedida.findOne({
            folio:req.body.folio
        },function(err,facturaFound){
            if(err)
                return res.status(500).send(err);
            else if(facturaFound)
                return res.status(400).send("Esa factura ya existe.");
            else{
                factura.monto=0.0;
                
                for (var index = 0; index < factura.productos.length; index++) {
                    //var producto = new Producto();
                    var producto_id = factura.productos[index].producto;
                    var cantidad = factura.productos[index].cantidad;
                    var precio = factura.productos[index].precio;
                    var iva = factura.productos[index].iva;

                    var ivaMonto = 0;
                    if(iva  != 0)
                        ivaMonto = cantidad * precio * iva / 100;           
                            
                    factura.monto += (cantidad * precio) + ivaMonto;   
                    
                }
                
                //factura.fecha = Date.now();

                //using moment-timezone
                factura.fecha = moment(Date.now()).tz(moment.tz.guess()).format();

                factura.save(function(err,factura){
                    if(err)
                        return res.status(500).send(err);
                    else{
                        return res.status(201).send({success:true,message:'Factura creado exitosamente.'});   
                    }
                });
            }
        }); 
            
 app.get('/facturas');   
});

app.post('/facturas/recibidas', function(req, res) {
    var factura = new FacturaRecibida();
        
    factura.folio = req.body.folio;
    factura.cliente = req.body.cliente;
    factura.productos = req.body.productos;
    
    FacturaExpedida.findOne({
            folio:req.body.folio
        },function(err,facturaFound){
            if(err)
                return res.status(500).send(err);
            else if(facturaFound)
                return res.status(400).send("Esa factura ya existe.");
            else{
                factura.monto=0.0;
                
                for (var index = 0; index < factura.productos.length; index++) {
                    //var producto = new Producto();
                    var producto_id = factura.productos[index].producto;
                    var cantidad = factura.productos[index].cantidad;
                    var precio = factura.productos[index].precio;
                    var iva = factura.productos[index].iva;

                    var ivaMonto = 0;
                    if(iva  != 0)
                        ivaMonto = cantidad * precio * iva / 100;           
                            
                    factura.monto += (cantidad * precio) + ivaMonto;   
                    
                }
                
                //factura.fecha = Date.now();

                //using moment-timezone
                factura.fecha = moment(Date.now()).tz(moment.tz.guess()).format();

                factura.save(function(err,factura){
                    if(err)
                        return res.status(500).send(err);
                    else{
                        return res.status(201).send({success:true,message:'Factura creado exitosamente.'});   
                    }
                });
            }
        }); 
            
 app.get('/facturas');   
});

app.get('/facturas/expedidas/:factura_id',function(req,res){
    
    FacturaExpedida.findById(req.params.factura_id,function(err,factura){
        if(err)
            res.status(500).send(err);
        else if(factura){
            //req.user = user;
            
            res.status(200).json(factura);
        }else
            res.status(404).send({success:false,message:'No se encontraron facturas.'});
        
    });
    
});

app.get('/facturas/recibidas/:factura_id',function(req,res){
    
    FacturaRecibida.findById(req.params.factura_id,function(err,factura){
        if(err)
            res.status(500).send(err);
        else if(factura){
            //req.user = user;
            
            res.status(200).json(factura);
        }else
            res.status(404).send({success:false,message:'No se encontraron facturas.'});
        
    });
    
});

app.delete('/facturas/expedidas/:factura_id',function(req,res) {
    FacturaExpedida.remove({
        _id: req.params.factura_id
    }, function(err, factura){
        if (err)
            res.status(500).send(err);
        else    
            res.status(200).send({success:true,message:'Factura borrado exitosamente'});
            
    }
    );
});

app.delete('/facturas/recibidas/:factura_id',function(req,res) {
    FacturaRecibida.remove({
        _id: req.params.factura_id
    }, function(err, factura){
        if (err)
            res.status(500).send(err);
        else    
            res.status(200).send({success:true,message:'Factura borrado exitosamente'});
            
    }
    );
});

app.put('/facturas/expedidas/:factura_id',function(req,res){
    FacturaExpedida.findByIdAndUpdate(req.params.factura_id,{$set:req.body},{new:true,runValidators:true}, function(err,factura){
        if(err)
            res.status(500).send(err);
        else if(!factura)
            res.status(404).send({success:false,message:'No se encontraron facturas.'});
        else
            res.status(200).json(factura);
    });
});

app.put('/facturas/recibida/:factura_id',function(req,res){
    FacturaRecibida.findByIdAndUpdate(req.params.factura_id,{$set:req.body},{new:true,runValidators:true}, function(err,factura){
        if(err)
            res.status(500).send(err);
        else if(!factura)
            res.status(404).send({success:false,message:'No se encontraron facturas.'});
        else
            res.status(200).json(factura);
    });
});