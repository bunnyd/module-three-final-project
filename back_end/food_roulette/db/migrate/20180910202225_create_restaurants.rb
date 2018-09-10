class CreateRestaurants < ActiveRecord::Migration[5.2]
  def change
    create_table :restaurants do |t|
      t.string :name
      t.string :address
      t.string :food_type
      t.string :price_range
      t.float :rating

      t.timestamps
    end
  end
end
