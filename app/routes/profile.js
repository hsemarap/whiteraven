var express = require('express');
var router = exports.router = express.Router();
var OAuth = require('oauth');

var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  'RNObfLht2saEKcxqyDVHZh37B',
  '4IQt0qAneBsG494B5Xjdel9aIzhVHiU2rtUqHsA02t2lB8UUgP',
  '1.0A',
  null,
  'HMAC-SHA1'
);

router.route('/')
    .get(function(req, res) {
        var response = "";
        var sess = req.session;
        var params = "?" +
        "user_id=" + sess.user.id + "&" +
        "count=" + 20;
        var token1 = req.session.userToken;
        var token2 = req.session.userTokenSecret;
        var timelineAPIURL = 'https://api.twitter.com/1.1/statuses/user_timeline.json' + params;
        oauth.get(timelineAPIURL, token1, token2,
          function (e, data, result){
            if (e) console.error(e);
            res.json(data);
          });
    });

