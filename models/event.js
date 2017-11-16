var mongoose =require('mongoose');

var eventsSchema= new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  description: {type: String},
  time: {type: Number, required: true},
  executor: {type: mongoose.Schema.Types.ObjectId, ref: 'team', required: true},
  auxiliar: {type: mongoose.Schema.Types.ObjectId, ref: 'team'}
},{timestamps:true});

module.exports = mongoose.model('event', eventsSchema);