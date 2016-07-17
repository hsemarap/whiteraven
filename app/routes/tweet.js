var express = require('express');
var router = exports.router = express.Router();
var OAuth = require('oauth');
var Story = require.main.require('./app/models/story');
var storiesRoute = require.main.require('./app/routes/stories');

var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  'RNObfLht2saEKcxqyDVHZh37B',
  '4IQt0qAneBsG494B5Xjdel9aIzhVHiU2rtUqHsA02t2lB8UUgP',
  '1.0A',
  null,
  'HMAC-SHA1'
);

router.route('/:tweet_id')
    .get(function(req, res) {
        var tweet_id = req.params.tweet_id;
        var token1 = req.session.userToken;
        var token2 = req.session.userTokenSecret;
        var timelineAPIURL = 'https://api.twitter.com/1.1/statuses/oembed.json?id=' + tweet_id;

        Story.findOne({tweet_id: tweet_id}, function(err, story) {
            if (err) {
                res.send(err);
                return;
            }
            if (story == null) {
              oauth.get(timelineAPIURL, token1, token2,
                function (e, data, result){
                  if (e) console.error(e);
                  try {
                    var dataJSON = JSON.parse(data);
                    var newstory = {};
                    newstory["url"]= dataJSON.url;
                    newstory["title"]= dataJSON.text;
                    newstory["description"]= dataJSON.html;
                    newstory["tags"]= "Tweet";
                    newstory["addedBy"]= dataJSON.author_url;
                    newstory["createdAt"]= dataJSON.created_at;
                    newstory["tweet_id"]= tweet_id;
                    storiesRoute.create(newstory, function(err) {
                      if (err) {
                        console.log("Tweet story creation failed: " + tweet_id);
                        res.send(err);
                        return;
                      }
                      console.log("Tweet story created: " + tweet_id);
                      res.send(dataJSON.html);
                    });
                  } catch(e) {
                    console.log("Error while parsing tweet endpoint response");
                  }
                });
            } else {
              console.log("Got tweet " + tweet_id + " from DB");
              res.send(story.description);
            }
        });

    });

