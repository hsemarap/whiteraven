var express = require('express');
var router = exports.router = express.Router();
var Story = require.main.require('./app/models/story');

var findOrCreate = exports.findOrCreate = function (obj, callback) {
  Story.findOrCreate(obj, callback);
};


router.route('/')
    .post(function(req, res) {
        var story = new Story();
        story.url = req.body.url;
        story.title = req.body.title;
        story.description = req.body.description;
        story.tags = req.body.tags;
        story.addedBy = req.body.addedBy;
        story.createdAt = req.body.createdAt;
        story.updatedAt = req.body.updatedAt;
        story.tweet_id = req.body.tweet_id;

        story.save(function(err) {
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
