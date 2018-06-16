var express = require('express');
var router = express.Router();
/** @member {Object} */
var azure = require('azure');


//Start
router.get('/', function(req, res){
    res.render('index.html');
});
//Get all Users
router.get('/test/:id', function(req, res){
    res.render('test.html', {salida: req.params.id});
});

router.post('/test/submit', function(req, res){
    var ServiceBusConnectionString = 'Endpoint=sb://proyecto3ope.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=aUdZFjbCMuSSe3KmwEyByhFfF8GAS+PH2SXESwM62q4=';
    var serviceBusService = azure.createServiceBusService(ServiceBusConnectionString);

    var greenTime = req.body.greenTime;
    var redTime = req.body.redTime;
    var yellowTime = req.body.yellowTime;
    var bGreen = req.body.bGreen;
    var bRed = req.body.bRed;
    var bYellow = req.body.bYellow;

    var rawMessage = {
        greenTime: greenTime,
        redTime: redTime,
        yellowTime: yellowTime,
        blinkGreen: bGreen,
        redBlink: bRed,
        yellowBlink: bYellow
    };
    var message = {
        body: JSON.stringify(rawMessage)
    };
    console.log(message);
    serviceBusService.sendQueueMessage('prueba2', message, function(error){
        if(error){
            res.send(error);
        }
        console.log('mesage sent')
    });
    res.redirect('/test/' + req.body.greenTime);
});
module.exports = router;
