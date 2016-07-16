var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');
var TagSchema = new Schema({
    name: String
});

TagSchema.plugin(findOrCreate);
module.exports = mongoose.model('Tag', TagSchema);