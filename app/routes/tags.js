var express = require('express');
var router = express.Router();
var Tag = require.main.require('./app/models/tag');

router.route('/')
    .post(function(req, res) {
        var tag = new Tag();
        tag.name = req.body.name;

        tag.save(function(err) {
            if (err) {
                res.send(err);
                return;
            }

            res.json({message: 'Tag created!'});
        })
    })

    .get(function(req, res) {
        Tag.find(function(err, tags) {
            if (err) {
                res.send(err);
                return;
            }

            res.json(tags);
        })
    })

router.route('/:tag_id')
    .get(function(req, res) {
        Tag.findById(req.params.tag_id, function(err, tag) {
            if (err) {
                res.send(err);
                return;
            }
            res.json(tag);
        });
    })

    .put(function(req, res) {
        Tag.findById(req.params.tag_id, function(err, tag) {
            if (err) {
                res.send(err);
                return;
            }
            var props = ["name"];
            var request = req.body;
            props.forEach(function(attrib){
              if (attrib in request) {
                tag[attrib] = request[attrib];
              }
            });

            tag.save(function(err) {
                if (err) {
                    res.send(err);
                    return;
                }
                res.json({message: 'Tag updated!!'});
            })
        })
    })

    .delete(function(req, res) {
        Tag.remove({
            _id: req.params.tag_id
        }, function(err, tag) {
            if (err) {
                res.send(err);
                return;
            }
            res.json({message: 'Delete Success'});
        })
    })

module.exports = router;