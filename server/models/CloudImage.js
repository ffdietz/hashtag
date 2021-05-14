const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CloudImageSchema = new Schema({
    asset_id: String,
    public_id: String,
    format: String,
    version: Number,
    resource_type: String,
    type: String,
    created_at: Date,
    bytes: Number,
    width: Number,
    height: Number,
    url: String,
    secure_url: String,
    ig_uploaded_at: String
    });

const CloudImage = mongoose.model('CloudImage', CloudImageSchema);
module.exports = CloudImage