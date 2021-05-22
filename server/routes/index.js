const express = require('express');
const router  = express.Router();
const { cloudinary } = require('../configs/cloudinary-setup.config');
const CloudImage = require('../models/CloudImage')
require('../configs/database.config');

/* Connection test*/
router.get('/', (req, res, next) => {
  res.send('connected')
});

router.get('/api/:quantity', async (req, res) => {
  const images = await cloudinary.api
  .resources(
    {
    resource_type: "image",
    max_results: req.params.quantity
    }
  );
  return res.json( images )
  });

  router.get('/color/:id', async (req, res) => {
    const images = await cloudinary.api
    .resource(
        req.params.id
      ,
      {
        colors: true,
        image_metadata:true,
      }
      );
    return res.json( images );
  });

router.get('/cloud-resources', async (req, res) => {
  const results = [];
  await list_resources(results);
  return res.status(200).json(results);
});

router.get('/database-resources', (req, res) => {
  CloudImage.find({  })
  .then((data) => {
      res.json(data);
  })
  .catch((error) => {
      console.log('error: ', error);
  });
});

module.exports = router;

//FUNCTIONS
async function list_resources(results, next_cursor = null) {
  await new Promise((resolve) => {
      cloudinary.api
        .resources(
          {
              resource_type: "image",
              max_results: 500,
              next_cursor: next_cursor,
          },
          function (err, res) {
              if (err) {
                  console.log(err);
                  resolve();
                  
              } else {
                  console.log("rate_limit_remaining " + res.rate_limit_remaining )
                  res.resources.forEach(function (resource) {
                      resource.ig_uploaded_at = createDate(resource.public_id.slice(0,19));
                      results.push(resource);
                  });
                  if (res.next_cursor) {
                      list_resources(results, res.next_cursor)
                      .then(() => resolve());
                  } else {
                      resolve();
                  }
              }
          }
      );
  });
};

const createDate = dateString => {
  const date = dateString.split(/[-_.]/);
  return new Date(date[0], date[1] - 1, date[2], date[3], date[4], date[5]);
};

// https://cloudinary.com/blog/build_the_back_end_for_your_own_instagram_style_app_with_cloudinary