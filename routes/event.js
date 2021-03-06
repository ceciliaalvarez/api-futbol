//Informar nuevo evento indicando juego y datos necesarios según el evento (i.e. tipo, equipo, hora, etc).

var mongoose = require('mongoose');
var router = require('express').Router();
var Event = mongoose.model('event');
var Match = mongoose.model('match');

var ObjectId = mongoose.Types.ObjectId;

//Crear un evento de un partido
router.post('/:id', (req, res, next) => {
    let type = req.body.type;
    let description = req.body.description;
    let time = req.body.time;
    let executor = req.body.executor;
    let auxiliar = req.body.auxiliar;
    var matchaux;
      
    var event = new Event({
        type: type,
        description: description,
        time: time,
        executor: executor,
        auxiliar: auxiliar,     
    });

    event.save(err => {
            console.log(event._id);
            if(err) {return res.sendStatus(401); }
            Match.findById(req.params.id).then(match=>{
                let evs=match.events;
                evs.push(event._id);
                match.events=evs;
                console.log(match);
                match.save();
            });
        res.send("Event had been posted \n" + event);
    });
});



//Listar todos los eventos
router.get('/', (req, res, next) => {
    Event.find({})
        .populate('type')
        .populate('executor')
        .populate('auxiliar')
        .exec(function (err, events) {
            console.log(events);
            return res.json({ 'events': events })
        })
        .catch(next);
        /*.then(events => {
            if (!events) { return res.sendStatus(401); }
            return res.json({ 'events': events })
        })
        .catch(next);*/
    //res.send("get events");
    //next();
});

//Listar un evento
router.get('/:id', (req, res, next) => {
    let id = req.params.id
    Event.findById(id)
        .populate('type')
        .populate('executor')
        .populate('auxiliar')
        .exec(function (err, event) {
            console.log(event);
            return res.json({ 'event': event })
        })
        .catch(next);
        /*.then(event => {
            if (!event) { return res.sendStatus(401); }
            return res.json({ 'event': event })
        })
        .catch(next);*/
    //res.send("get event:" + id);
   
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
    Event.findByIdAndRemove(req.params.id, (err, event) => {
        let response = {
            message: "Event successfully deleted",
            id: event._id
        };
        res.status(200).send(response);
    });
});

module.exports = router;
