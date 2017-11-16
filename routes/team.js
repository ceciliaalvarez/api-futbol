var mongoose = require('mongoose');
var router = require('express').Router();
var Team = mongoose.model('team');

var ObjectId = mongoose.Types.ObjectId;

router.post('/', (req, res, next) => {
    let name = req.body.name;
    let stadium = req.body.stadium;   
    let points = req.body.points;

    var team = new Team({
        name: name,
        stadium: stadium,
        points: points
    });

    team.save();
    res.send("team had been posted \n" + team);
});

router.get('/', (req, res, next) => {
    Team.find({})
        .then(teams => {
            if (!teams) { return res.sendStatus(401); }
            return res.json({ 'teams': teams })
        })
        .catch(next);
        res.send("get teams");
   
});


router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    Team.findById(id)
        .then(team => {
            if (!team) { return res.sendStatus(401); }
            return res.json({ 'team': team })
        })
      
        res.send("get team" + id);
          //.catch(next);
});

router.put('/:id', (req, res, next) => {
    Team.findOneAndUpdate({ id: req.params.id }, req.body, { new: true }, function (err, team) {
        if (err)
            res.send(err);
        res.json(team);
    });
    res.send("team updated");

});

router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    Team.findByIdAndRemove(id);
    res.status(200).send("delete client:" + id);
});

module.exports = router;
