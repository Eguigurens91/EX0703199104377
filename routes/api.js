var express = require('express');
var router = express.Router();
var apiExamen = require('./api/Examen');

router.use('/Examen',apiExamen);

module.exports = router;
