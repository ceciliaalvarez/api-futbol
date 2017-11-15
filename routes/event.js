var mongoose = require('mongoose');
var router = require('express').Router();
var Event = mongoose.model('event');

var ObjectId = mongoose.Types.ObjectId;

router.get('/', (req, res, next) => {
    Event.find({})
        .then(events => {
            if (!events) { return res.sendStatus(401); }
            return res.json({ 'events': events })
        })
        .catch(next);
    //res.send("get events");
    //next();
});

router.get('/:id', (req, res, next) => {
    //let id =  new ObjectId(req.params.id);
    let id = req.params.id
    Event.findById(id)
        .populate('event')
        .then(event => {
            if (!event) { return res.sendStatus(401); }
            return res.json({ 'event': event })
        })
        .catch(next);
    //res.send("get client:" + id);
    //next();
});

router.post('/', (req, res, next) => {
    let id = req.body.id;
    let name = req.body.name;
    res.send("post client:" + id + " - name:" + name);
    //next();
});

router.put('/:id', (req, res, next) => {
    let id_event = req.params.id
    let description = req.body.description;
    let name = req.body.name;
    res.send("put event:" + id_event + " - name:" + name + " - description" + description);
    //next();
});

router.delete('/:id', (req, res, next) => {
    let id_event = req.params.id;
    Event.findByIdAndRemove(id_event);
    res.sendStatus(200);
    //res.send("delete event:"+id);
    //next();
});

module.exports = router;
