var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

var UserSchema = new Schema({
    name: String,
    handle: String,
    _id: Number
});

UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', UserSchema);