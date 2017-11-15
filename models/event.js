var mongoose =require('mongoose');

var eventsSchema= new mongoose.Schema({
  id_event: {type: String , unique: true, required: true},
  description: {type: String, required: true},
  name: {type: String, unique: true, required: true}
},{timestamps:true});

mongoose.model('event', eventsSchema);