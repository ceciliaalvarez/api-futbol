var mongoose =require('mongoose');

var matchSchema= new mongoose.Schema({
  id_match: {type: String,unique: true, required: true},
  date: {type: Date, required: true},
  hour: {type: Date, required: true},
  id_team1: {type: Number, required: true},
  id_team2: {type: Number, required: true},
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'event' }]

},{timestamps:true});

mongoose.model('match', matchSchema);