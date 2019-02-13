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

//Metodo Get
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

//Metodo POST
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

//Metodo Put
router.put('/done/:ExamenId', function(req, res, next){
    var _ExamenId = req.params.ExamenId;
    var _ExamenUpds = req.body;
    var _ExamenUpdated = null;
    var newData = data.map(
      function(doc, i){
        if (doc._id == _ExamenId){
          _ExamenUpdated = Object.assign(
            {},
            doc,
            {"done":true},
            _ExamenUpds
            );
          return _ExamenUpdated;
        }
        return doc;
      }
    );
    data = newData;
    fileModel.write(data, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ 'Error': 'Error al Guardar Data' });
      }
      return res.status(200).json(_ExamenUpdated);
    });
  });

  //Metodo Delete
  router.delete('/delete/:ExamenId', function(req, res, next){
    var _ExamenId = req.params._ExamenId;
    var newData = data.filter(
      function (doc, i) {
        if (doc._id == _ExamenId) {
          return false;
        }
        return true;
      }
    );
    data = newData;
    fileModel.write(data, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ 'error': 'Error al Guardar Data' });
      }
      return res.status(200).json({"delete": _ExamenId});
    });
  }); 
  
fileModel.read(function(err , filedata){
  if(err){
    console.log(err);
  } else{
    data = JSON.parse(filedata);
  }
});

module.exports = router;