class UsersController < ApplicationController
  def show
  end

  def index
    render json: {
      sample: "string"
    }
  end

  def create
  end
end
