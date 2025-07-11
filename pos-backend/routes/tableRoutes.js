const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

router.post('/', tableController.addTable);
router.get('/', tableController.getTables);

module.exports = router;
