require('../configs/database.config');

exports.list_all_assets = async (req, res) => {
  CloudImage.find({  })
    .then((data) => { res.json(data); })
    .catch((error) => { console.log('error: ', error); });
}

exports.test = (req, res) => { 
  return res.json( 'local-db controllers connected' );
}