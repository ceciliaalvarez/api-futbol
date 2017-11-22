var mongoose = require('mongoose');

var eventTypeSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true},
    name: { type: String, unique: true, required: true },
 
}, { timestamps: true });

mongoose.model('eventtype', eventTypeSchema);