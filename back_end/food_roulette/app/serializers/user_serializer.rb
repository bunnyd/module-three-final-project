class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :username, :email, :restaurants
  def restaurants
    self.object.restaurants.map do |restaurant|
      {
        id: restaurant.id,
        name: restaurant.name,
        address: restaurant.address,
        food_type: restaurant.food_type,
        price_range: restaurant.price_range,
        rating: restaurant.rating
      }
    # {restaurants_id: self.object.restaurants.ids,
    # restaurants_name: self.object.restaurants.name,
    # restaurants_address: self.object.restaurants.address,
    # restaurants_food_type: self.object.restaurants.food_type,
    # restaurants_price_range: self.object.restaurants.price_range,
    # reclass UserSerializer < ActiveModel::Serializer
    end
  end
end
