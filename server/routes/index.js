const express = require('express');
const router  = express.Router();
const CloudImage = require('../models/CloudImage')
const cloudinary_controllers = require('../controllers/cloudinaryControllers');

// router.get('/cloudinary-request', async (req, res) => {
//   const results = [];
//   await list_all_resources(results);
//   return res.status(200).json(results);
// });

router.get('/cloudinary-request/:quantity', async (req, res) => {
  const images = await cloudinary.api
  .resources(
    {
      resource_type: "image",
      folder: "lo_q",
      max_results: req.params.quantity
  })
  .then(res => { return res.resources })
  .catch(err => console.error(err));

  return res.json( images )
});

// router.get('/mongo-request', (req, res) => {
//   CloudImage.find({  })
//   .then((data) => {
//       res.json(data);
//   })
//   .catch((error) => {
//       console.log('error: ', error);
//   });
// });


// router.get('/cloudinary-request/color/:id', ({ data }, req, res) => {
//   console.log("router color/:id");
//   return json( data );
// });


/* test*/
router.get('/', cloudinary_controllers.test );


module.exports = router;


//construir una function async to get metadata and request it as a middleware


// router.get('/cloud-resources/color/:id', async (req, res) => {
//   const images = await cloudinary.api
//   .resource( req.params.id ,
//     {
//       colors: true,
//       image_metadata:true,
//     })
//     .then(res => { return res })
//     .catch(err => console.error(err));
//   return res.json( images );
// }
// );