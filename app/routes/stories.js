var express = require('express');
var router = exports.router = express.Router();
var Story = require.main.require('./app/models/story');

var findOrCreate = exports.findOrCreate = function (obj, callback) {
  Story.findOrCreate(obj, callback);
};


var create = exports.create = function(obj, callback) {
    var story = new Story();
    story.url = obj.url;
    story.title = obj.title;
    story.description = obj.description;
    story.tags = obj.tags;
    story.addedBy = obj.addedBy;
    story.createdAt = obj.createdAt;
    story.updatedAt = obj.updatedAt;
    story.tweet_id = obj.tweet_id;
    story.save(callback);
};

var hodAPIkey = "2ebf90bc-8278-4eae-b99e-08722003d840";

router.route('/')
    .post(function(req, res) {
        create(req.body, function(err) {
            if (err) {
                res.send(err);
                return;
            }

            res.json({message: 'Story created!'});
        })
    })

    .get(function(req, res) {
        Story.find(function(err, stories) {
            if (err) {
                res.send(err);
                return;
            }

            res.json(stories);
        })
    })

router.route('/:story_id')
    .get(function(req, res) {
        Story.findById(req.params.story_id, function(err, story) {
            if (err) {
                res.send(err);
                return;
            }
            res.json(story);
        });
    })

    .put(function(req, res) {
        Story.findById(req.params.story_id, function(err, story) {
            if (err) {
                res.send(err);
                return;
            }
            var props = ["url","title","description","tags","addedBy","createdAt","updatedAt"];
            var request = req.body;
            props.forEach(function(attrib){
              if (attrib in request) {
                story[attrib] = request[attrib];
              }
            });

            story["updateAt"] = new Date();

            story.save(function(err) {
                if (err) {
                    res.send(err);
                    return;
                }
                res.json({message: 'Story updated!!'});
            })
        })
    })

    .delete(function(req, res) {
        Story.remove({
            _id: req.params.story_id
        }, function(err, story) {
            if (err) {
                res.send(err);
                return;
            }
            res.json({message: 'Delete Success'});
        })
    })
