var mongoose = require('mongoose');
var router = require('express').Router();
var Event = mongoose.model('event');

var ObjectId = mongoose.Types.ObjectId;

router.post('/', (req, res, next) => {
    let name = req.body.name;
    let description = req.body.description;
    let time = req.body.time;
    let executor = req.body.executor;
    let auxiliar = req.body.auxiliar;
      
    var event = new Event({
        name: name,
        description: description,
        time: time,
        executor: executor,
        auxiliar: auxiliar,     
    });
    event.save();
    res.send("Event had been posted \n" + event);
});

router.get('/', (req, res, next) => {
    Event.find({})
        .then(events => {
            if (!events) { return res.sendStatus(401); }
            return res.json({ 'events': events })
        })
        .catch(next);
    res.send("get events");
    //next();
});

router.get('/:id', (req, res, next) => {
    let id = req.params.id
    Event.findById(id)
        .then(event => {
            if (!event) { return res.sendStatus(401); }
            return res.json({ 'event': event })
        })
        .catch(next);
    res.send("get event:" + id);
   
});


router.put('/:id', (req, res, next) => {
    
    Event.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, event) {
        if (err)
            res.send(err);
        res.json(event);
    });
    res.send("put event:" + event);

});

router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    Event.findByIdAndRemove(id);
    //res.sendStatus(200);
    res.send("event deleted :" +id);
});


module.exports = router;
