var mongoose = require('mongoose');
var router = require('express').Router();
var Match = mongoose.model('match');

var ObjectId = mongoose.Types.ObjectId;

router.get('/', (req, res, next) => {
    Match.find({})
         .then(matches => {
            if (!matches) { return res.sendStatus(401); }
            return res.json({ 'matches': matches })
            })
        .catch(next);
    //res.send("get clients");
    //next();
});

router.get('/:id', (req, res, next) => {
    //let id =  new ObjectId(req.params.id);
    let id = req.params.id
    Match.findById(id)
        .populate('matches')
        .then(match => {
            if (!match) { return res.sendStatus(401); }
            return res.json({ 'matches': matches })
        })
        .catch(next);
    //res.send("get client:" + id);
    //next();
});

router.post('/', (req, res, next) => {
    let id_match = req.body.id_match;
    let date = req.body.date;
    let hour = req.body.hour;
    let id_team1 = req.body.id_team1 ;
    let id_team2 = req.body.id_team2;
    let events = req.body.events;
    res.send("post match:" + id_match + " - date:" + date);
    //next();
});

router.put('/:id', (req, res, next) => {
    let id_match = req.body.id_match;
    let date = req.body.date;
    let hour = req.body.hour;
    let id_team1 = req.body.id_team1;
    let id_team2 = req.body.id_team2;
    let events = req.body.events;
    res.send("post match:" + id_match + " - date:" + date);
    //next();
});

router.delete('/:id', (req, res, next) => {
    let id_match = req.params.id_match;
    Match.findByIdAndRemove(id);
    res.sendStatus(200);
    //res.send("delete match:"+id);
    //next();
});

module.exports = router;
