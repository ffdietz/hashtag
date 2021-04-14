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

module.exports = router;
