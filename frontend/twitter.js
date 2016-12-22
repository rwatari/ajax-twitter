const FollowToggle = require("./follow_toggle.js");
const UsersSearch = require("./users_search.js");
const TweetCompose = require("./tweet_compose.js");
const InfiniteTweets = require("./infinite_tweets.js");


$(() => {
  $(".follow-toggle").each(function() {
    new FollowToggle($(this));
  });
  $(".users-search").each(function() {
    new UsersSearch($(this));
  });
  $(".tweet-compose").each(function() {
    new TweetCompose($(this));
  });
  $(".infinite-tweets").each(function() {
    new InfiniteTweets($(this));
  });
});
