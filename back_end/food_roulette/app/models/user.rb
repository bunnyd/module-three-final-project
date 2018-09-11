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

  def self.search(search_food_type, search_price_range, search_zip_code, search_rating)
    yelpBaseURL = "https://api.yelp.com/v3/businesses/search?"
    yelpAPIKey = "JXu7Wwa0miaPPT1CkKGrX97vdRQJG8cOOyDmG6OkYNmTs55lCGpfG1dyzJUTIjJhkzORD3yFWCWG-gvkttv6eoA5JMzqh5PghtvBtlpZBkwzgSro9YhQfW8aM9phW3Yx"
    yelpURL = "#{yelpBaseURL}term=#{search_food_type}&price=#{search_price_range}&location=#{search_zip_code}&rating=#{search_rating}"

    response = RestClient.get(yelpURL, {'Authorization' => "Bearer #{yelpAPIKey}"  })
    result = JSON.parse(response.body)


    # uri = URI.parse(yelpURL)
    # req = Net::HTTP::Get.new(uri)
    # req.use_ssl = true
    #
    # req['Authorization'] = "Bearer #{yelpAPIKey}"
    #
    # res = Net::HTTP.start(uri.hostname, uri.port) {|http|
    #   byebug
    #   http.request(req)
    # }
    #
    # # response = Net::HTTP.get_response(req.)
    # result = JSON.parse(res.body)
  end
end
