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
  }

};


module.exports = APIUtil;
