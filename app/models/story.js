var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

var StorySchema = new Schema({
    url: {type: String, default: ''},
    title: {type: String, default: ''},
    description: {type: String, default: ''},
    tags: [{type: String, default: ''}],
    addedBy: [{type: String, default: ''}],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    tweet_id: {type: String, default: ''},
});
StorySchema.plugin(findOrCreate);
module.exports = mongoose.model('Story', StorySchema);