var express = require('express');
var router = express.Router();
var app = express();
module.exports = router;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "Content-Type");
       res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
          next();
    });
//
//Metodos generales (GET y POST)
//
router.get('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
     let query = "SELECT dni, nombre, obrasocial FROM `pacientes` ORDER BY dni ASC";
     connection.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            };
            res.send(result);
        });
        
});

router.post('/', async (req, res) => {
    let dni = req.body.dni;
    let nombre = req.body.nombre;
    let obrasocial = req.body.obrasocial;
    
    let query = "INSERT INTO `pacientes` (dni, nombre, obrasocial) VALUES("+dni+",'"+nombre+"','"+obrasocial+"')";
    
    connection.query(query, (err, result) => {
            if (err) {
                res.send(err);
            };
            res.send(result);
        });
});
//
//Usando el parametro DNI (GET, PUT y DELETE)
//
router.get('/:dni', async (req, res) => {
     let query = "SELECT * FROM `pacientes` WHERE dni="+req.params.dni+" ORDER BY dni ASC";
     connection.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            };
            res.send(result);
        });
});

router.put('/:dni', async (req, res) => {
    let nombre = req.body.nombre;
    let obrasocial = req.body.obrasocial;
     let query = "UPDATE pacientes SET nombre = '"+nombre+"', obrasocial = '"+obrasocial+"' WHERE dni= "+req.params.dni;
     connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.redirect('/');
            };
            res.send(result);
        });
});

router.delete('/:dni', async (req, res) => {
     let query = "DELETE FROM `pacientes` WHERE dni="+req.params.dni;
     connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.redirect('/');
            };
            res.send(result);
        });
});