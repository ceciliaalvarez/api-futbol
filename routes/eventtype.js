//ABMC de tipo de eventos(goles, amonestaciones, cambios)

var mongoose = require('mongoose');
var router = require('express').Router();
var EventType = mongoose.model('eventtype');

var ObjectId = mongoose.Types.ObjectId;

//Crear un evento
router.post('/', (req, res, next) => {
    let idevent = req.body.id;
    let nameevent = req.body.name;

    var etype = new EventType({
        id: idevent,
        name: nameevent,
    });
    etype.save();
    res.sendStatus(200);
    res.send("Event had been posted \n" + etype);
});

//Listar todos los eventos
router.get('/', (req, res, next) => {
    EventType.find({})
        .then(events => {
            if (!events) { return res.sendStatus(401); }
            return res.json({ 'events': events })
        })
        .catch(next);
    //res.send("get events");
    //next();
});

//Listar un evento
router.get('/:id', (req, res, next) => {
    let id = req.params.id
    EventType.findById(id)
        .then(event => {
            if (!event) { return res.sendStatus(401); }
            return res.json({ 'event': event })
        })
        .catch(next);
    //res.send("get event:" + id);

});

//Modificar evento
router.put('/:id', (req, res, next) => {
    EventType.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, event) {
        if (err)
            res.send(err);
        res.json(event);
    });
        res.status(200);
});

//Eliminar evento.

router.delete('/:id', (req, res, next) => {
    EventType.findByIdAndRemove(req.params.id, (err, eventtype) => {
    let response = {
        message: "Event type successfully deleted",
        id: eventtype._id
    };
    res.status(200).send(response);
    });
});

module.exports = router;
