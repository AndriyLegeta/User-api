const router = require('express').Router();

let loginController = require('../controllers/login');

router.post('/', loginController);

module.exports = router;
