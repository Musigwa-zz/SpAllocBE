const { Router } = require('express');

const errorHandler = require('../middleware/errorHandler');
const Stations = require('../controllers/stations');

const router = Router();

router.route('/stations')
  .get(errorHandler(Stations.getAll))
  .post(errorHandler(Stations.create));

router.route('/stations/:id')
  .get(errorHandler(Stations.getOne))
  .put(errorHandler(Stations.updateOne))
  .delete(errorHandler(Stations.deleteOne));

module.exports = router;