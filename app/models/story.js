var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StorySchema = new Schema({
    url: {type: String, default: ''},
    title: {type: String, default: ''},
    description: {type: String, default: ''},
    tags: [{type: Array, default: []}],
    addedBy: [{type: String, default: ''}],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Story', StorySchema);