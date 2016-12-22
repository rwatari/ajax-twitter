const APIUtil = require("./api_util.js");


class InfiniteTweets {
  constructor($el) {
    this.$el = $el;
    this.$ulFeed = this.$el.find("#feed");
    this.maxCreatedAt = null;
    this.fetchTweets();
    this.handleInsert();
  }

  fetchTweets() {
    this.$el.find('a.fetch-more').on("click", (e) => {

      APIUtil.insertTweets(this.maxCreatedAt)
        .then(res => this.handleSuccess(res));

        return false;
    });
  }

  handleSuccess(res) {
    this.maxCreatedAt = res[res.length - 1].created_at;
    res.forEach((tweet) => {
      const $li = this.renderTweet(tweet);
      this.$ulFeed.append($li);
    });

    if (res.length < 20) {
      this.$el.find(".fetch-more").remove();
    }
  }

  handleInsert() {
    this.$ulFeed.on("insert-tweet", (e, data) => {
      const $li = this.renderTweet(data);
      this.$ulFeed.prepend($li);
    });
  }

  renderTweet(data) {
    let $li = $('<li>');
    $li.append(`${data.content} -- `);
    $li.append(`<a href="/users/${data.user.id}">${data.user.username}</a> -- `);
    $li.append(data.created_at);

    if (data.mentions.length > 0) {
      this.addMentions($li, data.mentions);
    }
    return $li;
  }

  addMentions($li, mentions) {
    let $ulMention = $('<ul>');
    mentions.forEach( (cat) => {
      let $liMention = $('<li>');
      $liMention.append(`<a href="/users/${cat.user_id}">${cat.user.username}</a>`);
      $ulMention.append($liMention);
    });
    $li.append($ulMention);
  }

}

module.exports = InfiniteTweets;
