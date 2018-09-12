require 'net/http'
require 'open-uri'
require 'json'

class User < ApplicationRecord
  has_many :user_restaurants
  has_many :restaurants, through: :user_restaurants
  validates :first_name, :presence => true
  validates :last_name, :presence => true
  validates :email, :presence => true, :uniqueness => true
  validates :username, :presence => true, :uniqueness => true

  
end
