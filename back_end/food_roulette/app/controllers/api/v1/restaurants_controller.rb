class RestaurantsController < ApplicationController
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
      session[:user_id] = restaurant.id
    else
      render json: restaurant.errors
    end
  end

  private
  def restaurant_params
    params.require(:restaurant).permit(:name, :address, :price_range, :food_type, :rating)
  end
end
