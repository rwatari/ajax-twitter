const APIUtil = {
  followUser: function(id) {
    return $.ajax({
      method: "POST",
      url: `/users/${id}/follow`,
      dataType: 'json'
    });
  },

  unfollowUser: function(id) {
    return $.ajax({
      method: "DELETE",
      url: `/users/${id}/follow`,
      dataType: 'json'
    });
  },

  searchUsers: function(queryVal, successCallback) {
    return $.ajax({
      url: "/users/search",
      data: {
        query: queryVal
      },
      dataType: 'json'
    })
    .then(successCallback);
  },

  createTweet: function(tweetData) {
    return $.ajax({
      method: "POST",
      url: "/tweets",
      data: tweetData,
      dataType: 'json'
    });
  },

  insertTweets: function(maxCreatedAt) {
    let queryData;

    if (maxCreatedAt !== null) {
      queryData = { max_created_at: maxCreatedAt };
    }
    return $.ajax({
      method: "GET",
      url: "/feed",
      data: queryData,
      dataType: 'json'
    });
  }

};


module.exports = APIUtil;
