const { load } = require('dotenv');
const express = require('express');
const router  = express.Router();
const { cloudinary } = require('../configs/cloudinary-setup.config');

/* Connection testing*/
router.get('/', (req, res, next) => {
  res.send('server connected')
});

router.get('/hashtag/:quantity', async (req, res) => {
  const images = await cloudinary.api.resources({
    resource_type: 'image',
    max_results: req.params.quantity
  });
  return res.json( images );
});

router.get('/hashtag/color/:id', async (req, res) => {
  const images = await cloudinary.api
    .resource( 
      req.params.id, 
      { 
        colors: true,
        image_metadata:true,
      }
    );
    return res.json( images );
});

router.get('/hashtag/resources', async (req, res) => {
  const results = [];
  await list_resources(results);
  // console.log(results[0]);
  return res.status(200).json(results);
});

module.exports = router;

async function list_resources(results, next_cursor = null) {
  await new Promise((resolve) => {
    cloudinary.api.resources({
      resource_type: "image",
      max_results: 500,
      next_cursor: next_cursor,
    },
    function (err, res) {
      if (err) {
        console.log(err);
        resolve();
      } else {
        res.resources.forEach(function (resource) {
          resource.ig_uploaded_at = resource.public_id.slice(0,19);
          results.push(resource);
        });
        if (res.next_cursor) {
          list_resources(results, res.next_cursor)
          .then(() => resolve());
        } else {
          resolve();
        }
      }
    });
  });
}

// SEARCHING PARAMETERS
// https://cloudinary.com/documentation/admin_api#optional_parameters

// Seed MongoDB using external API in Node.js
// https://baraksaidoff.medium.com/seed-mongodb-using-external-api-in-node-js-e73f7a85ea5

// NEXT CURSOR
//https://support.cloudinary.com/hc/en-us/community/posts/360008223779-How-to-use-next-cursor-to-get-the-rest-of-the-files-in-a-specific-folder-
