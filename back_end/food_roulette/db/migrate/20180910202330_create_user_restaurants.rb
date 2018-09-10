class CreateUserRestaurants < ActiveRecord::Migration[5.2]
  def change
    create_table :user_restaurants do |t|
      t.belongs_to :user
      t.belongs_to :restaurant
      t.timestamps
    end
  end
end
