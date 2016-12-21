class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    # fetches the user we've logged in as
    return nil if self.session[:session_token].nil?
    @current_user ||= User.includes(:out_follows).find_by(session_token: self.session[:session_token])
  end

  def current_user_follows
    @follows ||= current_user.out_follows.pluck("followee_id")
  end
  
  helper_method :current_user, :current_user_follows

  def log_in!(user)
    # force other clients to log out by regenerating token
    user.reset_session_token!
    # log this client in
    self.session[:session_token] = user.session_token
  end

  def log_out!
    self.session[:session_token] = nil
  end

  def require_logged_in!
    redirect_to new_session_url if current_user.nil?
  end

  def require_not_logged_in!
    redirect_to feed_url unless current_user.nil?
  end
end
