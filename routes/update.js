const router = require('express').Router();

let updateController = require('../controllers/update');

router.put('/', updateController);

module.exports = router;
