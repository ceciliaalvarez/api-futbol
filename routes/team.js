//ABMC de equipos deportivos

var mongoose = require('mongoose');
var router = require('express').Router();
var Team = mongoose.model('team');

//Crear equipo
router.post('/', (req, res, next) => {
    let nameteam = req.body.name;
    let stadiumteam = req.body.stadium;
    let pointsteam = req.body.points;

    var team = new Team({
        name: nameteam,
        stadium: stadiumteam,
        points: pointsteam,
    });
    team.save();
    //res.sStatus(200);
    res.send("Team had been posted \n" + team);
});

//Listar todos los equipos
router.get('/', (req, res, next) => {
    Team.find({})
        .then(teams => {
            if (!teams) { return res.sendStatus(401); }
            return res.json({ 'teams': teams })
        })
        .catch(next);
        //res.send("get teams");
   
});

//Listar un equipo
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    Team.findById(id)
        .then(team => {
            if (!team) { return res.sendStatus(401); }
            return res.json({ 'team': team })
        })
      
        //res.send("get team" + id);
          //.catch(next);
});

//Modificar equipo
router.put('/:id', (req, res, next) => {
    Team.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, team) {
        if (err)
            res.send(err);
        res.json(team);
    });
    res.send("team updated");

});

//Eliminar equipo
router.delete('/:id', (req, res, next) => {
    Team.findByIdAndRemove(req.params.id, (err, team) => {
        let response = {
            message: "Team successfully deleted",
            id: team._id
        };
        res.status(200).send(response);
    });
});

module.exports = router;
