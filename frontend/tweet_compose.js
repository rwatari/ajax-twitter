const APIUtil = require("./api_util.js");

class TweetCompose {
  constructor($el) {
    this.$el = $el;
    this.$submit = $el.find('input[type="submit"]');
    this.$counter = $el.find('.chars-left');
    this.submitHandler();
    this.textHandler();
    this.addMentionHandler();
    this.removeMentionHandler();
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
    this.$el.find("textarea").val("");
    this.$counter.text(140);
    this.$el.find('div.mentioned_users').empty();
    this.$el.find(":input").attr("disabled", false);
  }

  handleSuccess(res) {
    let idSelector = this.$el.data("tweets-ul");
    let $feedUl = $(idSelector);
    $feedUl.trigger("insert-tweet", res);
    this.clearInput();

  }

  textHandler() {
    this.$el.find("textarea").on("input", (e) => {
      this.$counter.text(140 - $(e.currentTarget).val().length);
    });
  }

  addMentionHandler() {
    $(".add-mentioned-user").on("click", (e) => {
      const $selectScript = this.$el.find(".dynamic-mention-select");
      $("div.mentioned_users").append($selectScript.html());
      return false;
    });
  }

  removeMentionHandler() {
    $("div.mentioned_users").on("click", "a.remove-mentioned-user", (e) => {
      $(e.currentTarget).parent().remove();
      return false;
    });
  }
}

module.exports = TweetCompose;
