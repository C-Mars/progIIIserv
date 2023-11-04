const Router = require('express');

const {estadistica,estadistica2} = require('../..//controllers/estadistica');

const router = Router();

router
    .get('/estadistica', estadistica)
    .get('/estadistica2', estadistica2);

module.exports = router;