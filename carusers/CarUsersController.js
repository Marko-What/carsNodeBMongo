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
            console.log(rows);
             res.json(rows);
        })
        .catch(function(error) {
            // Handle error here
        })
	

});



router.get('/single', function (req, res) {
 
		carusers.getsinglecaruser(req.query._id)
        .then(function(rows) {
            console.log(rows);
             res.json(rows);
        })
        .catch(function(error) {
            // Handle error here
        })



});


router.post('/', function (req, res) {


	 carusers.createcaruser(req.raw_body)
        .then(function() {
          res.json('NEW USER ADDED');
        })
        .catch(function(error) {
            res.status(400).json(error);
        })


});


router.post('/update', function (req, res) {
    carusers.updatecaruser(req.raw_body, function (err, data) {
        if (err) {
            res.status(400).json(err);
        }
        else {
           // res.json(data);
        }
				res.data("later on	");
    });
});



router.post('/delete', function (req, res) {
    carusers.deletecaruser(req.raw_body, function (err, data) {
        if (err) {
            res.status(400).json(err);
        }
        else {
            res.json({});
        }
    });
});

module.exports = router;











