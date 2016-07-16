var express = require('express');
var router = express.Router();
var User = require.main.require('./app/models/user');

router.route('/')
    .post(function(req, res) {
        var user = new User();
        user.name = req.body.name;
        user.handle = req.body.handle;
        user.tokenId = req.body.token;

        user.save(function(err) {
            if (err) {
              res.send(err);
              return;
            }

            res.json({message: 'User created!'});
        })
    })

    .get(function(req, res) {
        User.find(function(err, users) {
            if (err) {
              res.send(err);
              return;
            }

            res.json(users);
        })
    })

router.route('/:user_id')
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err) {
              res.send(err);
              return;
            }
            res.json(user);
        });
    })

    .put(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err) {
              res.send(err);
              return;
            }
            var props = ["name", "handle", "token"];
            var request = req.body;
            props.forEach(function(attrib){
              if (attrib in request) {
                user[attrib] = request[attrib];
              }
            });

            user.save(function(err) {
                if (err) {
                  res.send(err);
                  return;
                }
                res.json({message: 'User updated!!'});
            })
        })
    })

    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err) {
              res.send(err);
              return;
            }
            res.json({message: 'Delete Success'});
        })
    })

module.exports = router;