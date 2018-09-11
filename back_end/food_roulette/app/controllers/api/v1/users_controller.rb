class Api::V1::UsersController < ApplicationController
  before_action :user_params, only: [:create]
  

  def show
  end

  def index
    users = User.all
    render json: users

  end

  def create
    user = User.new(user_params)

    if user.valid?
      user.save
    else
      user.errors
    end
    # User.create(user_params)
  end

  private
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :username)
  end
end
