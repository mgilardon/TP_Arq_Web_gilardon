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
    let query = "SELECT turnos.id, medicos.nombre AS medico, pacientes.nombre AS paciente, turnos.fecha FROM turnos INNER JOIN medicos ON turnos.leg_med=medicos.legajo INNER JOIN pacientes ON turnos.dni_pac=pacientes.dni ORDER BY id ASC";
    //    
    connection.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            };
            res.send(result);
        });
});

router.post('/', async (req, res) => {
    let id = req.body.id;
    let leg_med = req.body.leg_med;
    let dni_pac = req.body.dni_pac;
    let fecha = req.body.fecha;
    
    let query = "INSERT INTO `turnos` (id,leg_med, dni_pac, fecha) VALUES("+id+", "+leg_med+","+dni_pac+",'"+fecha+"')";
    
    connection.query(query, (err, result) => {
            if (err) {
                res.send(err);
            };
            res.send(result);
        });
});
//
//Usando el parametro ID (GET, PUT y DELETE)
//
router.get('/:id', async (req, res) => {
     let query = "SELECT * FROM `turnos` WHERE id="+req.params.id+" ORDER BY id ASC";
     connection.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            };
            res.send(result);
        });
});

router.put('/:id', async (req, res) => {
    let leg_med = req.body.leg_med;
    let dni_pac = req.body.dni_pac;
    let fecha = req.body.fecha;

     let query = "UPDATE turnos SET leg_med = "+leg_med+", dni_pac = "+dni_pac+", fecha = '"+fecha+"' WHERE id = "+req.params.id;
     connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.redirect('/');
            };
            res.send(result);
        });
});

router.delete('/:id', async (req, res) => {
     let query = "DELETE FROM `turnos` WHERE id="+req.params.id;
     connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.redirect('/');
            };
            res.send(result);
        });
});