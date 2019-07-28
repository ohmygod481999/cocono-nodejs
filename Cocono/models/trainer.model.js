const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TrainerSchema = new Schema({
    name : { type: String, require: true, unique: true},
    email : { type: String, require: true},
    phone_number : String
});

module.exports = mongoose.model('Trainer', TrainerSchema);