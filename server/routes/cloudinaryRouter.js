const express = require('express');
const router  = express.Router();

const cloudinary_controllers = require('../controllers/cloudinaryControllers');

/* test */
router.get('/', 
  cloudinary_controllers.test);

/* by quantity */
router.get('/quantity/:quantity', 
  cloudinary_controllers.quantity);

/* list all resources */
router.get('/list-all', 
  cloudinary_controllers.list_all_resources);

/* request metadata */
router.get('/metadata/:id', 
  cloudinary_controllers.metadata);

module.exports = router;