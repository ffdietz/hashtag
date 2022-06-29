require('../configs/database.config');
const CloudImage = require('../models/CloudImage')

exports.list_all_assets = async ( req, res ) => 
{
  CloudImage.find({ })
    .then((data) => { res.json( data ); })
    .catch((error) => { console.log('error: ', error); });
}

exports.quantity_middleware = async ( req, res, next ) => 
{
  req.assets = CloudImage.find( { } )
    .limit(+req.params.quantity)
    .select("public_id")
    .then((data) => { return data })
    .catch((error) => { console.log('error: ', error); });

  next();
}

exports.test = (req, res) => 
{ 
  return res.json( 'local-db controllers connected' );
}