const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
    name : { type: String, require: true, unique: true}
});

module.exports = mongoose.model('Category', CategorySchema);