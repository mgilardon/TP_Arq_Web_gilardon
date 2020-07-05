var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "Content-Type");
       res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
          next();
    });
//
//Conexion a BDD mysql
//
global.connection = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'admin',
  password : 'labo1',
  database : 'pedidos'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('Connectado con id ' + connection.threadId);
});
//
//Declaracion de endpoints
//
var medicos = require('./medicos');
var pacientes = require('./pacientes');
var turnos = require('./turnos');

app.use('/medicos', medicos);
app.use('/pacientes', pacientes);
app.use('/turnos', turnos);

app.use(function (req, res, next) {
  res.status(404).send("La dirección del request no es valida!");
});

app.listen(3000, function () {
  console.log("El Api esta funcionando en puerto 3000!");
});


