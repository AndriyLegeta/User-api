const router = require('express').Router();

let mailSendController = require('../controllers/mailSend');

router.post('/', mailSendController);

module.exports = router;
