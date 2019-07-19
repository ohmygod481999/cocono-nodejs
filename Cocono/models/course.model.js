const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CourseSchema = new Schema({
    name : String,
    price : Number
});

module.exports = mongoose.model('Course', CourseSchema);