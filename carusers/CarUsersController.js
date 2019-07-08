var express = require('express');
var router = express.Router();
const querystring = require('querystring');


var carusers = require('./carusers');


router.use(function(req, res, next) {
  var data = '';
  req.setEncoding('utf8');
    req.on('data', function(part) {      // while there is incoming data,
       data += part;                     // collect parts in `data` variable
    }); 

    req.on('end', function() {           // when request is done,
        req.raw_body = data;                 // save collected data in req.body
        next();
    });
});





router.get('/', function (req, res) {
       carusers.getcarusers()
        .then(function(rows) {
             res.json(rows);
        })
        .catch(function(error) {
             res.json('something went wrong');
        })
	

});



router.get('/single', function (req, res) {
     carusers.getsinglecaruser(req.query._id)
        .then(function(rows) {
             res.json(rows);
        })
        .catch(function(error) {
             res.json('something went wrong');
        })



});


router.post('/', function (req, res) {
	
	carusers.createcaruser(req.raw_body)
       .then(function(data) {
						res.send(data);
        
        })
        .catch(function(error) {
            res.status(400).json(error);
        })
		

});



router.put('/update', function(req, res) {
    carusers.updatecaruser(req.raw_body).then(function(data) {
					res.send(data);
        })
        .catch(function(error) {
            res.status(400).json(error);
        })
});






router.delete('/delete', function (req, res) {
    carusers.deletecaruser(req.raw_body).then(function(data) {
					res.send(data);
        })
        .catch(function(error) {
            res.status(400).json(error);
        });




});



module.exports = router;











