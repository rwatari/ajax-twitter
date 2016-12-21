const APIUtil = require('./api_util.js');

class FollowToggle {
  constructor($el, options) {
    this.$el = $el;
    this.userId = $el.data("user-id") || options.id;
    this.followState = $el.data("initial-follow-state") || (options.followed ? "followed" : "unfollowed");
    this.render();
    this.handleClick();
  }

  render() {
    if (this.isTransitioning()) {
      this.$el.attr("disabled", true);
    } else {
      this.$el.attr("disabled", false);
      this.$el.text(this.isFollowed() ? "Unfollow!" : "Follow!");
    }
  }

  handleClick() {
    this.$el.on("click", (e) => {
      e.preventDefault();

      this.followInteract()
        .then( () => {
          this.$el.data(`initial-follow-state`, (this.isFollowing() ? "followed" : "unfollowed"));
          this.followState = this.$el.data("initial-follow-state");
          this.render();
        });

      this.followState = (this.isFollowed() ? "unfollowing" : "following");
      this.render();
    });
  }


  followInteract() {
    if (this.isFollowed()) {
      return APIUtil.unfollowUser(this.userId);
    } else {
      return APIUtil.followUser(this.userId);
    }
  }

  isFollowed() {
    return this.followState === "followed";
  }

  isFollowing() {
    return this.followState === "following";
  }

  isTransitioning() {
    return this.followState === "following" || this.followState === "unfollowing";
  }

}

module.exports = FollowToggle;
