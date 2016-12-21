const APIUtil = require("./api_util.js");

class TweetCompose {
  constructor($el) {
    this.$el = $el;
    this.$submit = $el.find('input[type="submit"]');
    this.$counter = $el.find('.chars-left');
    this.submitHandler();
    this.textHandler();
  }

  submitHandler() {
    this.$el.on("submit", (e) => {
      e.preventDefault();

      this.submit(e)
        .then(res => this.handleSuccess(res));
      this.$el.find(":input").attr("disabled", true);

    });
  }

  submit(e) {
    let formData = $(e.currentTarget).serialize();
    return APIUtil.createTweet(formData);
  }

  clearInput() {
    this.$el.find("select").val("");
    this.$el.find("textarea").val("");
    this.$el.find(":input").attr("disabled", false);
  }

  handleSuccess(res) {

    let id_selector = this.$el.data("tweets-ul");
    let $feed_ul = $(id_selector);
    let $li = $('<li>');
    $li.append(`${res.content} -- `);
    $li.append(`<a href="/users/${res.user.id}">${res.user.username}</a> -- `);
    $li.append(res.created_at);
    if (res.mentions.length > 0) {
      let $ul_mention = $('<ul>');
      res.mentions.forEach( (cat) => {
        let $li_mention = $('<li>');
        $li_mention.append(`<a href="/users/${cat.user_id}">${cat.user.username}</a>`);
        $ul_mention.append($li_mention);
      });
      $li.append($ul_mention);
    }
    $feed_ul.prepend($li);

    this.clearInput();

  }

  textHandler() {
    this.$el.find("textarea").on("input", (e) => {
      this.$counter.text(140 - $(e.currentTarget).val().length);
    });
  }


}

module.exports = TweetCompose;
