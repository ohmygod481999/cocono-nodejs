const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CourseSchema = new Schema({
    name : { type: String, require: true, unique: true},
    price : { type: Number, require: true},
    duration : Number,
    students : Number,
    lectures : Number,
    overview: String,
    requirement: String,
    trainer: {
        type: Schema.ObjectId,
        ref: 'Trainer'
    },
    category: {
        type: Schema.ObjectId,
        ref: 'Category'
    }
});

module.exports = mongoose.model('Course', CourseSchema);