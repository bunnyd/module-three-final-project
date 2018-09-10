class RestaurantsController < ApplicationController
  def show
  end

  def index
    restaurants = Restaurant.all
    render json: restaurants
  end

  def create
  end
end
