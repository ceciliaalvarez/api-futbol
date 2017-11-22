//ABMC de equipos deportivos

var mongoose = require('mongoose');
var router = require('express').Router();
var Team = mongoose.model('team');

//Crear equipo
router.post('/', (req, res, next) => {
    let name1 = req.body.name;
    let stadium1 = req.body.stadium;   
    let points1 = req.body.points;

    var team = new Team({
        name: name1,
        stadium: stadium1,
        points: points1,
    });

    team.save();
    res.sendStatus(200);
    //res.send("team had been posted \n" + team);
});

//Listar todos los equipos
router.get('/', (req, res, next) => {
    Team.find({})
        .then(teams => {
            if (!teams) { return res.sendStatus(401); }
            return res.json({ 'teams': teams })
        })
        .catch(next);
        res.send("get teams");
   
});

//Listar un equipo
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

//Modificar equipo
router.put('/:id', (req, res, next) => {
    Team.findOneAndUpdate({ id: req.params.id }, req.body, { new: true }, function (err, team) {
        if (err)
            res.send(err);
        res.json(team);
    });
    res.send("team updated");

});

//Eliminar equipo
router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    Team.findByIdAndRemove(id);
    res.status(200).send("delete client:" + id);
});

module.exports = router;
