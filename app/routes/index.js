var express = require('express');
var router = exports.router = express.Router();

router.route('/')
    .get(function(req, res) {
        res.json({ message: 'Hey! The white raven welcomes you!' });
    });

