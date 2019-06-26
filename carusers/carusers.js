
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
		console.log(rows);
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
		console.log(rows);
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
	 
	newCarUser.save(function(err) {
	    if (err) throw err;
	    console.log('newCarUser successfully saved.');
	});


    },









   updatecaruser: function (carUser) {
		let obja = JSON.parse(carUser);
			

	modelTest.findByIdAndUpdate(
	    // the id of the item to find
	    obja._id,
	    
	    // the change to be made. Mongoose will smartly combine your existing 
	    // document with this change, which allows for partial updates too
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
	    // Handle any possible database errors
		if (err) return res.status(500).send(err);
		console.log(user);
		return "yes";
		//return res.send("yes");
	    }
	)

		
		
    },




   deletecaruser: function (carUserData, callback) {
					let obja = JSON.parse(carUserData);

		modelTest.findByIdAndRemove(obja._id, (err, tasks) => {
		    //if (err) return res.status(500).send(err);
		    const response = {
		        message: "Car User successfully deleted"
		    };
			
		});
    }

 }


module.exports = carusers;
