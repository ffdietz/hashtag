const mongoose = require("mongoose");
const CloudImage = require("./models/CloudImage");
const axios = require("axios");
let saveCounter = 0;

mongoose
    .connect("mongodb://localhost:27017/hashtag", {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(x => console.log(`Connected to Mongo - Database name: "${x.connections[0].name}"`))
    .catch(err => console.error('Error connecting to Mongo', err.message));

console.log(process.env.MONGO_URI)

const url = "http://localhost:5500/hashtag/resources";

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
        // console.log(resultData)
        for(let i = 0 ; i < resultData.length; i++){
            let cloudImage = new CloudImage ({
                asset_id:   resultData[i].asset_id,
                public_id:  resultData[i].public_id,
                format:     resultData[i].format,
                version:    resultData[i].version,
                resource_type: resultData[i].resource_type,
                type:       resultData[i].type,
                created_at: resultData[i].created_at,
                bytes:      resultData[i].bytes,
                width:      resultData[i].width,
                height:     resultData[i].height,
                url:        resultData[i].url,
                secure_url: resultData[i].secure_url,
                ig_uploaded_at: resultData[i].ig_uploaded_at
            })
            cloudImage.save ( () => {
                console.log("saved" + cloudImage)
                saveCounter++;
            
                if (saveCounter === resultData.length) {
                console.log(saveCounter);
                    mongoose.disconnect()
                    .then(() => console.log("saved succesfully and mongodb   disconnected"))
                    .catch(error => console.log(error));
                    }
            });
        }
    })
    .catch(error => {
    console.log(error)
    })
}

cloudData()