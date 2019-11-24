const mongo = require('mongoose');
const Schema = mongoose.Schema;

const chefSchema = new Schema({
    name: String,
    rating: Number
});

module.exports = mongo.model('Chef', chefSchema);