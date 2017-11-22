var mongoose = require('mongoose');

var eventsSchema= new mongoose.Schema({
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'eventtype', required: true },
  description: {type: String},
  time: {type: Number, required: true},
  executor: {type: mongoose.Schema.Types.ObjectId, ref: 'team', required: true},
  auxiliar: {type: mongoose.Schema.Types.ObjectId, ref: 'team'}
},{timestamps:true});

mongoose.model('event', eventsSchema);