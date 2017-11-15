var mongoose =require('mongoose');

var teamSchema= new mongoose.Schema({
  id_team: {type: Number, unique: true, required: true},
  name: {type: String},
  score: {type: Number}
  
},{timestamps:true});

mongoose.model('team', teamSchema);
