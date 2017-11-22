var router = require('express').Router();

router.use('/api/team', require('./team'));
router.use('/api/event', require('./event'));
router.use('/api/match', require('./match'));
router.use('/api/eventtype', require('./eventtype'));

module.exports=router;
