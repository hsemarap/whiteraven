var express = require('express');
var router = exports.router = express.Router();
var User = require.main.require('./app/models/user');

var findOrCreate = exports.findOrCreate = function (obj, callback) {
  User.findOrCreate(obj, callback);
};

var create = exports.create = function(obj, callback) {
  var user = new User();
  user.name = obj.name;
  user.handle = obj.handle;
  user.save(callback);
};

router.route('/')
    .post(function(req, res) {
        createUser(req.body, function(err) {
            if (err) {
              res.send(err);
              return;
            }

            res.json({message: 'User created!'});
        });
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
            var props = ["name", "handle", "_id"];
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
