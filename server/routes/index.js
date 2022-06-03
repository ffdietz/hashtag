const express = require('express');
const router  = express.Router();
const CloudImage = require('../models/CloudImage')
const cloudinary_controllers = require('../controllers/cloudinaryControllers');

// router.get('/mongo-request', (req, res) => {
//   CloudImage.find({  })
//   .then((data) => {
//       res.json(data);
//   })
//   .catch((error) => {
//       console.log('error: ', error);
//   });
// });

/* test*/
router.get('/', cloudinary_controllers.test );


module.exports = router;