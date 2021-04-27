const { load } = require('dotenv');
const express = require('express');
const router  = express.Router();
const { cloudinary } = require('../configs/cloudinary-setup.config');

/* Connection test*/
router.get('/', (req, res, next) => {
  res.send('connected')
  // res.render('index');
});

// Call the cloudinary api
router.get('/api', async (req, res) => {
  const images = await cloudinary.api.resources(
      {
      folder: 'Hashtag',
      },
    );
  return res.json( images );
  });


router.get('/api/:quantity', async (req, res) => {
  const images = await cloudinary.api.resources({
    // type: 'upload',
    folder: 'Hashtag',
    max_results: req.params.quantity
  });
  return res.json( images );
  });

  router.get('/api/:id', async (req, res) => {
    const images = await cloudinary.api.resources({
      public_id: req.params.id,
    },
    {
      colors: true
    }
    );
    return res.json( images );
    });

  router.get('/hashtag/resources', async (req, res) => {
    async function list_resources(results, next_cursor = null) {
      await new Promise((resolve) => {
          cloudinary.api.resources(
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
                      res.resources.forEach(function (resource) {
                          results.push(resource);
                      });

                      if (res.next_cursor) {
                          list_resources(results, res.next_cursor).then(() => resolve());
                      } else {
                          resolve();
                      }
                  }
                  
              }
          );
      });
  }

  const results = [];
  await list_resources(results);
  console.log(results);
  return res.status(200).json(results);
});

module.exports = router;
