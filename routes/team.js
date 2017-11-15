var mongoose = require('mongoose');
var router = require('express').Router();
var Team = mongoose.model('team');

var ObjectId = mongoose.Types.ObjectId;

router.get('/', (req, res, next) => {
    Team.find({})
        .then(teams => {
            if (!teams) { return res.sendStatus(401); }
            return res.json({ 'teams': teams })
        })
        .catch(next);
    //res.send("get clients");
    //next();
});

router.get('/:id', (req, res, next) => {
    //let id =  new ObjectId(req.params.id);
    let id_team = req.params.id_team;
    Team.findById(id_team)
        .populate('teams')
        .then(team => {
            if (!team) { return res.sendStatus(401); }
            return res.json({ 'team': team })
        })
        .catch(next);
    //res.send("get client:" + id);
    //next();
});

router.post('/', (req, res, next) => {
    let id_team = req.body.id_team;
    let name = req.body.name;
    let scrore = req.body.scrore;
    res.send("post team:" + id + " - name:" + name);
    //next();
});

router.put('/:id', (req, res, next) => {
    let id_team = req.body.id_team;
    let name = req.body.name;
    let scrore = req.body.scrore;
    res.send("post team:" + id + " - name:" + name);
    //next();
});

router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    User.findByIdAndRemove(id);
    res.sendStatus(200);
    //res.send("delete client:"+id);
    //next();
});

module.exports = router;
