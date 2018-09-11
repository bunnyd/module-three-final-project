class SessionsController < ApplicationController
  def new
  end

  def create
    # find the user with that username
    user = User.find_by(email: params[:email])

    # check if password is legit
    if user
      session[:user_id] = user.id
    else
      flash[:error] = "YOU ARE NOT ALLOWED."
    end
  end

  def destroy
    session[:user_id] = nil
  end
end
