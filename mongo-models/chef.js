const mongo = require('mongoose');
const Schema = mongo.Schema;

const chefSchema = new Schema({
    name: String,
    rating: Number
});

module.exports = mongo.model('Chef', chefSchema);