const APIUtil = require("./api_util.js");
const FollowToggle = require("./follow_toggle.js");

class UsersSearch {
  constructor($el) {
    this.$el = $el;
    this.$ul = $el.find($('ul'));
    this.$input = $el.find('input[type="text"]');
    this.handleInput();
  }

  handleInput() {
    this.$input.on('input', (e) => {
      APIUtil.searchUsers(this.$input.val(), res => this.renderResults(res));
    });
  }

  renderResults(res) {
    this.$ul.find('li').remove();
    res.forEach( (user) => {
      const $li = $('<li>');
      $li.append(`<a href="/users/${user.id}">${user.username}</a>`);
      const $button = $("<button>");
      $button.addClass("follow-toggle");
      new FollowToggle($button, user);
      $li.append($button);
      this.$ul.append($li);
    });
  }
}

module.exports = UsersSearch;
