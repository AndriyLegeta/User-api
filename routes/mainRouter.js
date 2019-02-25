const router = require('express').Router();

let getAllController = require('../controllers/getAll');
let createController = require('../controllers/create');
let updateController = require('../controllers/update');
let getByIdController = require('../controllers/getById');

router.get('/', getAllController);
router.post('/', createController);

router.get('/:id', getByIdController);
router.put('/:id', updateController);


module.exports = router;
