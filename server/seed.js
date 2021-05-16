const mongoose = require("mongoose");
require('dotenv').config();
const CloudImage = require("./models/CloudImage");
const axios = require("axios");
let saveCounter = 0;

const db_uri = process.env.DB_URI;

mongoose
    .connect(db_uri, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(x => console.log(`Connected to Mongo - Database name: "${x.connections[0].name}"`))
    .catch(err => console.error('Error connecting to Mongo', err.message));

const url = "http://localhost:5500/resources";

const getData = () => {
    try {
        return axios.get(url)
    } catch (error) {
        console.error(error)
    }
}

const cloudData = async () => {
    const data = getData()
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
                    downloaded_at:  resultData[i].created_at,
                    bytes:          resultData[i].bytes,
                    width:          resultData[i].width,
                    height:         resultData[i].height,
                    url:            resultData[i].url,
                    uploaded_at:    resultData[i].ig_uploaded_at,
                    image_description: '',
                    keywords: ''
                })
                cloudImage.save ( () => {
                    console.log("saved" + cloudImage)
                    saveCounter++;
                
                    if (saveCounter === resultData.length) {
                    console.log(saveCounter);
                        mongoose.disconnect()
                        .then(() => console.log("saved succesfully and mongodb disconnected"))
                        .catch(error => console.log(error));
                        }
                });
            }
        })
        .catch(error => { console.log(error)    })
}

cloudData()
