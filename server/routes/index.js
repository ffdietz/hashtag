const { load } = require('dotenv');
const express = require('express');
const router  = express.Router();
const { cloudinary } = require('../configs/cloudinary-setup.config');

/* Connection test*/
router.get('/', (req, res, next) => {
  res.send('connected')
  // res.render('index');
});

router.get('/api/:quantity', async (req, res) => {
  const images = await cloudinary.api.resources({
      // type: 'upload',
      resource_type: 'image',
      max_results: req.params.quantity
    });
    return res.json( images );
  });

router.get('/hashtag/color/:id', async (req, res) => {
  const images = await cloudinary.api.resource(
    req.params.id
  ,
  {
    colors: true,
    // image_metadata:true,
  }
  );
    return res.json( images );
  });

router.get("/hashtag", async (req, res) => {
  async function list_resources(results, next_cursor = null) {
    await new Promise((resolve) => {
      cloudinary.api.resources(
        {
          resource_type: "image",
          max_results: 500,
          next_cursor: next_cursor,
        },
        (err, res) => {
          if (err) {
            resolve();
          } 
            console.log("RATE_LIMIT_REMAINING " + res.rate_limit_remaining )
            res.resources.forEach((resource) => {
              // resource.ig_uploaded_at = resource.public_id.slice(0,19);
              // resource.date = resource.public_id.slice(0,19).split(/[-_.]/);
              results.push(resource);
            });
            if (res.next_cursor) {
              list_resources(results, res.next_cursor)
              .then(() => resolve());
            }
            else {
              resolve();
          }
        }
      );
    });
  }

    const results = [];
    await list_resources(results);
    return res.json(results);
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
                  
              }
          );
      });
  }

  const results = [];
  await list_resources(results);
  console.log(results[0]);
  return res.status(200).json(results);
});

module.exports = router;

// SEARCHING PARAMETERS
// https://cloudinary.com/documentation/admin_api#optional_parameters

// Seed MongoDB using external API in Node.js
// https://baraksaidoff.medium.com/seed-mongodb-using-external-api-in-node-js-e73f7a85ea5

// NEXT CURSOR
//https://support.cloudinary.com/hc/en-us/community/posts/360008223779-How-to-use-next-cursor-to-get-the-rest-of-the-files-in-a-specific-folder-


// function list_resources(results, next_cursor = null) {

//   cloudinary.api.resources(
//       {
//           resource_type: "image",
//           type: "upload",
//           prefix: "some/folder",
//           mex_results: 500, //can be any value up to 500
//           next_cursor: next_cursor
//       },
//       (err, res) => {
//         res.resources.forEach(function(resource){
//             //Do some processing or checks
//             results.push(resource.secure_url);
//         });

//         if (res.next_cursor) {
//           list_resources(results, res.next_cursor);
//         } else {
//           console.log("Done", results);
//         }
//       }
//   );
// }

// let results = [];
// list_resources(results);