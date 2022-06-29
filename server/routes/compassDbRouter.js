const express = require('express');
const router  = express.Router();
const compassdb_controllers = require('../controllers/compassDbControllers');

/* test*/
router.get('/', 
  compassdb_controllers.test );

/* list all resources */
router.get('/all-assets', 
  compassdb_controllers.list_all_assets);


module.exports = router;