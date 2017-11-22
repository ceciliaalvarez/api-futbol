var mongoose =require('mongoose');

var matchSchema= new mongoose.Schema({
  id: {type: Number, required: true, unique: true},
  date: {type: Date, required: true},
  stadium: { type: String, required: true },
  finished: { type: Boolean, required: true },
  team1: { type: mongoose.Schema.Types.ObjectId, ref: 'team', required: true },
  team2: { type: mongoose.Schema.Types.ObjectId, ref: 'team', required: true },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'event' }],
  score: { type: String, required: true}
},{timestamps:true});

mongoose.model('match', matchSchema);