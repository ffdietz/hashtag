require('dotenv').config();
const mongoose = require("mongoose");
const CloudImage = require("./models/CloudImage");
const axios = require("axios");
let saveCounter = 0;

function beginConnection(uri){
    mongoose
        .connect(uri, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(x => console.log(`CONNECTED TO MONGODB - CLUSTER: "${x.connections[0].name}"`))
        .catch(err => console.error('ERROR CONNECTING TO MONGO', err.message));
}

function deleteCollection(collection){
    mongoose.connection.on('error', console.error);
    mongoose.connection.once('open', function () {
        mongoose.connection.dropCollection(collection, function (err, result) {
            if (err) {
                console.log("ERROR DELETE COLLECTION");
            } else {
                console.log(`COLLECTION ${collection} DELETED SUCCESSFULLY`);
            }
        });
    });
}

const gettingDataFrom = (url) => {
    try {
        return axios.get(url)
    } catch (error) {
        console.error(error)
    }
}

const updating = async (url) => {
    const data = gettingDataFrom(url)
        .then(response => {
            const resultData = response.data;
            for(let i = 0 ; i < resultData.length; i++){
                let cloudImage = new CloudImage ({
                    asset_id:       resultData[i].asset_id,
                    public_id:      resultData[i].public_id,
                    format:         resultData[i].format,
                    version:        resultData[i].version,
                    resource_type:  resultData[i].resource_type,
                    type:           resultData[i].type,
                    created_at:     resultData[i].created_at,
                    bytes:          resultData[i].bytes,
                    width:          resultData[i].width,
                    height:         resultData[i].height,
                    url:            resultData[i].url,
                    ig_uploaded_at: resultData[i].ig_uploaded_at,
                    image_description: '',
                    keywords: ''
                })
                cloudImage.save ( () => {
                    if(showResults)console.log("SAVED" + cloudImage)
                    saveCounter++;
                
                    if (saveCounter === resultData.length) {
                        mongoose.disconnect()
                        .then(() => console.log(saveCounter + " ITEMS SAVED SUCCESFULLY - MONGODB DISCONNECTED"))
                        .catch(error => console.log(error));
                        }
                });
            }
        })
        .catch(error => { console.log(error)    })
}


const db_uri = process.env.DB_URI;
const url_consulted = "http://localhost:5500/cloud-resources";
const showResults = false;

beginConnection(db_uri);
deleteCollection("cloudimages");
updating(url_consulted);