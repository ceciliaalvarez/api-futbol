//Informar nuevo evento indicando juego y datos necesarios según el evento (i.e. tipo, equipo, hora, etc).

var mongoose = require('mongoose');
var router = require('express').Router();
var Event = mongoose.model('event');

var ObjectId = mongoose.Types.ObjectId;

//Crear un evento de un partido
router.post('/', (req, res, next) => {
    let type = req.body.type;
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

//Listar todos los eventos
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

//Listar un evento
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

//Modificar evento
router.put('/:id', (req, res, next) => {
    
    Event.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, event) {
        if (err)
            res.send(err);
        res.json(event);
    });
    res.send("put event:" + event);

});

//Eliminar evento con su id
router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    Event.findByIdAndRemove(id);
    //res.sendStatus(200);
    res.send("event deleted :" +id);
});


module.exports = router;
