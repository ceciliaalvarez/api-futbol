var mongoose = require('mongoose');
var router = require('express').Router();
var Match = mongoose.model('match');

var ObjectId = mongoose.Types.ObjectId;

router.post('/', (req, res, next) => {
    let date = req.body.date;
    let stadium = req.body.stadium;
    let finished = req.body.finished;
    let team1 = req.body.team1;
    let team2 = req.body.team2;
    let events = req.body.events;
    let score = req.body.score;

    var match = new Match({
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

router.get('/', (req, res, next) => {
    Match.find({})
        .then(matches => {
            if (!matches) { return res.sendStatus(401); }
            return res.json({ 'matches': matches })
        })
        .catch(next);
    res.send("get matches");
    //next();
});

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
    res.send("put match:" + match);

});

router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    Match.findByIdAndRemove(id);
    //res.sendStatus(200);
    res.send("match deleted :" + id);
});


module.exports = router;
