const { cloudinary } = require('../configs/cloudinary-setup.config');
require('../configs/database.config');

exports.metadata_all = async (req, res) => {
  const images = await cloudinary.api
  .resource( req.params.id ,
    {
      colors: true,
      image_metadata:true,
    })
    .then(res => { return res })
    .catch(err => console.error(err));
  return res.json( images );
}

exports.metadata = async (req, res) => {
  const images = await cloudinary.api
  .resource( req.params.id ,
    {
      colors: true,
      image_metadata:true,
    })
    .then(res => { return res })
    .catch(err => console.error(err));
  return res.json( images );
}

exports.list_all_assets = async ( req, res) => {
  const results = [];  
  const list_all = async (results, next_cursor = null ) => { 
    await cloudinary.api.resources(
    {
      resource_type: "image",
      max_results: 500,
      next_cursor: next_cursor,
    })
    .then(res => {
      res.resources.forEach((resource) => {
        resource.ig_uploaded_at = createDate(resource.public_id.slice(0,19));
        results.push(resource);
      });
      if(res.next_cursor)  return list_all(results, res.next_cursor)
    })
    .catch(err => console.error(err));
  }
  
  await list_all(results);
  
  return res.json(results);
};

exports.quantity = async (req, res) => {
  const images = await cloudinary.api.resources(
    {
      resource_type: "image",
      folder: "lo_q",
      max_results: req.params.quantity
    })
    .then(res => { return res.resources })
    .catch(err => console.error(err));
  
  return res.json( images )
};

exports.test = (req, res) => { 
  return res.json( 'cloudinary controllers connected' );
}

const createDate = ( dateString ) => {
  const date = dateString.split(/[-_.]/);
  return new Date(date[0], date[1] - 1, date[2], date[3], date[4], date[5]);
};
