class Api::V1::RestaurantsController < ApplicationController
  before_action :restaurant_params

  def show
  end

  def index
    restaurants = Restaurant.all
    render json: restaurants
  end

  def create
    restaurant = Restaurant.new(restaurant_params)
    if restaurant.valid?
      restaurant.save
      render json: restaurant
    else
      render json: restaurant.errors
    end
  end

  private
  def restaurant_params
    params.require(:restaurant).permit(:name, :address, :price_range, :food_type, :rating)
  end
end
