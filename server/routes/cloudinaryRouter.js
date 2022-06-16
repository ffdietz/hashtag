const express = require('express');
const router  = express.Router();
const cloudinary_controllers = require('../controllers/cloudinaryControllers');
const compassdb_controllers = require('../controllers/compassDbControllers');

/* test */
router.get('/', 
  cloudinary_controllers.test);

/* by quantity */
router.get('/quantity=:quantity', 
  cloudinary_controllers.quantity);

/* list all resources */
router.get('/all-assets', 
  cloudinary_controllers.list_all_assets);

/* request metadata */
router.get('/metadata=:id', 
  cloudinary_controllers.metadata);

/* request ALL metadata */
router.get('/metadata-all', 
  cloudinary_controllers.metadata_all);

router.get('/get-metadata-of=:quantity',
  compassdb_controllers.quantity_middleware,
  cloudinary_controllers.metadata
  );

module.exports = router;