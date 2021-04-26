const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageItemSchema = new Schema({
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
    url: mongoose.SchemaTypes.Url,
    secure_url: mongoose.SchemaTypes.Url
    });

const ImageItem = mongoose.model('ImageItem', ImageItemSchema);
module.exports = ImageItem;