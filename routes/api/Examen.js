var express = require('express');
var router = express.Router();
var uuidv4 = require('uuid/v4');

var fileModel = require('./jsonmodel');
var data = null;

var Examendata={
    '_id':'',
    'RTN':'',
    'Empresa':'',
    'Correo':'',
    'Rubro':'',
    'Direccion':'',
    'Telefono':''
    };

router.get('/', function(req,res,next){
    if(!data){
        fileModel.read(function(err,filedata){
            if(err){
                console.log(err),
                data=[];
                return res.status(500).json({'Error':'Error en la Data!'});
            }
            data = JSON.parse(filedata);
            return res.status(200).json(data);
        });
    }else{
        return res.status(200).json(data);
    }
});

router.post('/new',function(req,res,next){
    var _Examendata = Object.assign({},Examendata,req.body);
    _Examendata._id = uuidv4();
    if(!data){
        data =[];
    }
    data.push(_Examendata);
    fileModel.write(data, function(err){
        if(err){
            console.log(err);
            return res.status(500).json({'error':'Error en la DATA!'});
        }
        return res.status(200).json(_Examendata);
    });
});



fileModel.read(function(err , filedata){
  if(err){
    console.log(err);
  } else{
    data = JSON.parse(filedata);
  }
});