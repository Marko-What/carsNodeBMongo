
const mongoose = require('mongoose');

var options = {
user: "superAdmin",
pass: "admin123",
newUrlParser: true,
};


mongoose.connect('mongodb://localhost:27017/test', options);
let db = mongoose.connection;



db.once('open', function(){
	console.log('connected to mongodb');
});

db.on('error', function(err){
	console.log(err);
});

mongoose.set('useFindAndModify', false);
let modelTest = require('../modelTest');







var carusers = {
  getcarusers: function () {   
       // return db.query('SELECT * FROM usersCars', callback);

	return new Promise(function(resolve, reject) {
       
		modelTest.find({},function(err, rows){
			//console.log(rows);
			if (err) 
					reject(err)
				else 
					resolve(rows);
			})
		});
    },





  getsinglecaruser: function (carUser) {
	
	return new Promise(function(resolve, reject) {
       
		modelTest.find({"_id":carUser._id},function(err, rows){
			//console.log(rows);
			if (err) 
						reject(err)
				else 
				resolve(rows);
			})
		});
    },



    createcaruser: function (carUser) {
	
	let carUsera = JSON.parse(carUser);

	let data = {
	    _id: new mongoose.Types.ObjectId(),
	    ime:carUsera.ime,
	    priimek: carUsera.priimek,
	    naslov: carUsera.naslov,
	    starost: carUsera.starost,
	    avto: carUsera.avto
	};

	

	var newCarUser = new modelTest(data);

	return new Promise(function(resolve, reject) {

		newCarUser.save(function(err) {
			if (err){
				reject({'data':'something went wrong'});
			} 
				resolve({'data':'saved'});
			});
		

		});
    },








   updatecaruser: function (carUser) {
		let obja = JSON.parse(carUser);
			
	return new Promise(function(resolve, reject) {

	modelTest.findByIdAndUpdate(obja._id,
	    {
		"ime" : obja.ime,
		"priimek" : obja.priimek,
		"naslov" : obja.naslov,
		"starost" : obja.starost,
		"avto" : obja.avto
	    },
	    
	    // an option that asks mongoose to return the updated version 
	    // of the document instead of the pre-updated one.
	    {new: true},
	    
	    // the callback function
	    (err, user) => {
		if (err) {
			console.log(err);			
			reject({"data":"user was not updated"});
		}
		 	resolve({"data":"user was updated"}); 
		
	    }
	

	)
 	}); /* end of return promise*/
		
		
    },




   deletecaruser: function (carUserData, callback) {
			let obja = JSON.parse(carUserData);

		return new Promise(function(resolve, reject) {

		modelTest.findByIdAndRemove(obja._id, (err, tasks) => {
		    //if (err) return res.status(500).send(err);
		    if (err){
				console.log('user was not deleted '+ err);
				reject({"data":"user was not deleted"});
			} 
	    		console.log({'data':'user was successfully deleted'});
			    resolve({'data':'user was successfully deleted'});
		});
			
		});


    }










 }


module.exports = carusers;
