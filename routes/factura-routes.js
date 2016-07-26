//Rutas del API para Facturas

var express = require('express'),
    jwt     = require('express-jwt'),
    config  = require('../config');

var app = module.exports = express.Router();

var Factura = require('../models/factura-model');

var jwtCheck = jwt({
  secret: config.secret
});

//app.use('/fatura', jwtCheck);

app.get('/facturas',function(req,res){
    //var factura = new Factura();
    
    Factura.find(function(err,facturas){
                if (err)
                    res.status(500).send(err);
                else
                    res.status(200).json(facturas);
            });
    
});

app.post('/facturas', function(req, res) {
    var factura = new Factura();
        
    factura.folio = req.body.folio;
    factura.fecha = req.body.fecha;
    factura.nombre = req.body.nombre;
    factura.rfc = req.body.rfc;
    factura.tipo = req.body.tipo;
    factura.productos = req.body.productos;
    factura.direccion = req.body.direccion;
    
    Factura.findOne({
            folio:req.body.folio, tipo:req.body.tipo
        },function(err,facturaFound){
            if(err)
                return res.status(500).send(err);
            else if(facturaFound)
                return res.status(400).send("Esa factura ya existe.");
            else{
                factura.monto=0.0;
                console.log("antes del for: "+ factura.monto);
                console.log("productos: "+ factura.productos);
                console.log("productos length: "+ factura.productos.length);
                
                for (var index = 0; index < factura.productos.length; index++) {
                    console.log("producto: "+ factura.productos[index]);                    
                    console.log("producto.iva: "+ factura.productos[index].iva); 
                    
                    var iva = 0;
                    if(factura.productos[index].iva  != 0)
                        iva = factura.productos[index].cantidad * factura.productos[index].precio * factura.productos[index].iva / 100;                         
                    console.log("iva: "+ iva);   
                               
                    factura.monto += (factura.productos[index].cantidad * factura.productos[index].precio) + iva;   
                    console.log("en el for: "+ factura.monto); 
                }
                
                /*
                for(var producto in factura.productos){
                    
                    console.log("producto: "+ producto);
                    
                    console.log("producto.iva: "+ producto.iva); 
                    var iva = 0;
                    if(producto.iva  != 0)
                        iva = producto.cantidad * producto.iva / 100; 
                         
                    console.log("iva: "+ iva);              
                    factura.monto += (producto.cantidad * producto.precio) + iva;   
                    console.log("en el for: "+ factura.monto);            
                }
                */
                factura.save(function(err,factura){
                    if(err)
                        return res.status(404).send(err);
                        else{
                            return res.status(201).send({success:true,message:'Factura creado exitosamente.'});   
                        }
                });
            }
        }); 
            
 app.get('/facturas');   
});

app.get('/facturas/:factura_id',function(req,res){
    
    Factura.findById(req.params.factura_id,function(err,factura){
        if(err)
            res.status(500).send(err);
        else if(factura){
            //req.user = user;
            
            res.status(200).json(factura);
        }else
            res.status(404).send({success:false,message:'No se encontraron facturas.'});
        
    });
    
});

app.delete('/facturas/:factura_id',function(req,res) {
    Factura.remove({
        _id: req.params.factura_id
    }, function(err, factura){
        if (err)
            res.status(500).send(err);
        else    
            res.status(200).send({success:true,message:'Factura borrado exitosamente'});
            
    }
    );
});

app.put('/facturas/:factura_id',function(req,res){
    Factura.findByIdAndUpdate(req.params.factura_id,{$set:req.body},{new:true,runValidators:true}, function(err,factura){
        if(err)
            res.status(500).send(err);
        else if(!factura)
            res.status(404).send({success:false,message:'No se encontraron facturas.'});
        else
            res.status(200).json(factura);
    });
});
