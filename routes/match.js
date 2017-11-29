//???Informe de finalización de juego 

var mongoose = require('mongoose');
var router = require('express').Router();
var Match = mongoose.model('match');

var ObjectId = mongoose.Types.ObjectId;

//Alta de juegos (partidos) indicando los id de los equipos y la fecha y hora de inicio.
router.post('/', (req, res, next) => {
    let id = req.body.id;
    let date = req.body.date;
    let stadium = req.body.stadium;
    let finished = req.body.finished;
    let team1 = req.body.team1;
    let team2 = req.body.team2;
    let events = req.body.events;
    let score = req.body.score;

    var match = new Match({
        id:id,
        date: date,
        stadium: stadium,
        finished: finished,
        team1: team1,
        team2: team2,
        events: events,
        score: score,
    });
    match.save();
    res.send("Match had been posted \n" + match);
});

//Consulta de juegos.
//Consulta de juegos activos(no finalizados).
router.get('/finished/:finished', (req, res, next) => {
    let fin = req.params.finished;
    if(fin==="true")
    {
        Match.find({})
            .then(matches => {
                if (!matches) { return res.sendStatus(401); }
                return res.json({ 'matches': matches })
            })
            .catch(next);
        res.send("get matches");
    }
    else
    {
        Match.find({ finished:false })
            .then(matches => {
                if (!matches) { return res.sendStatus(401); }
                return res.json({ 'matches': matches })
            })
            .catch(next);
        res.send("get active matches");
    }
    
});

//Consulta de detalle de un juego informando equipos y eventos
router.get('/:id', (req, res, next) => {
    let id = req.params.id
    Match.findById(id)
        .then(match => {
            if (!match) { return res.sendStatus(401); }
            return res.json({ 'match': match })
        })
        .catch(next);
    res.send("get match:" + id);

});


router.put('/:id', (req, res, next) => {

    Match.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, match) {
        if (err)
            res.send(err);
        res.json(match);
    });
    res.status(200);
    //res.send("put match:" + match);

});


//Baja de juego indicando el id del juego.

router.delete('/:id', (req, res, next) => {
    Match.findByIdAndRemove(req.params.id, (err, match) => {
        let response = {
            message: "Match successfully deleted",
            id: match._id
        };
        res.status(200).send(response);
    });
});


module.exports = router;
