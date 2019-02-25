const router = require('express').Router();

let deleteController = require('../controllers/delete');

router.delete('/:id', deleteController);

module.exports = router;
