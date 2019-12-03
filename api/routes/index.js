const { Router } = require('express');

const welcomePage = require('../controllers');
const stations = require('./stations');

const router = Router();
router.get('/', welcomePage);
router.use(stations);

module.exports = router;