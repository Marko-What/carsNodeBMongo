let mongoose = require('mongoose')

let testModel = mongoose.Schema({
  ime:{
  	type: String,
	required:true
  },
  priimek:{
  	type: String,
	required:true
  }, 
  naslov:{
  	type: String,
	required:true
  },
   starost:{
  	type: Number,
	required:true
  },
   avto:{
  	type: String,
	required:true
  }


});

let modelTest = module.exports = mongoose.model('carsUsers', testModel, 'carsUsers');
