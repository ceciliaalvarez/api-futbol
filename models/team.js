var mongoose = require('mongoose');

var teamSchema= new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  stadium: { type: String, required: true},
  points: { type: Number, required: true},
  
},{timestamps:true});

mongoose.model('team', teamSchema);
