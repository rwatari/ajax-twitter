const FollowToggle = require("./follow_toggle.js");
const UsersSearch = require("./users_search.js");

$(() => {
  $(".follow-toggle").each(function() {
    new FollowToggle($(this));
  });
  $(".users-search").each(function() {
    new UsersSearch($(this));
  });
});
