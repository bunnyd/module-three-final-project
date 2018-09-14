class Api::V1::UsersController < ApplicationController
  before_action :user_params, only: [:create]


  def show
    user = User.where("id=?",params[:id])
    render json: user
  end

  def index
    users = User.all
    render json: users
  end

  def login
    users = User.where("email=?",params[:email])
    session[:user_id] = users.first.id
    render json: users.first
  end

  def create
    user = User.new(user_params)

    if user.valid?
      user.save
      session[:user_id] = user.id

      render json: {success: true}

    else
      render json: {errors: user.errors}
    end
    # User.create(user_params)
  end

  def search
    yelpBaseURL = "https://api.yelp.com/v3/businesses/search?"
    yelpAPIKey = "JXu7Wwa0miaPPT1CkKGrX97vdRQJG8cOOyDmG6OkYNmTs55lCGpfG1dyzJUTIjJhkzORD3yFWCWG-gvkttv6eoA5JMzqh5PghtvBtlpZBkwzgSro9YhQfW8aM9phW3Yx"
    yelpURL = "#{yelpBaseURL}term=#{params[:search_food_type]}&price=#{params[:search_price_range]}&location=#{params[:search_zip_code]}"
    response = RestClient.get(yelpURL, {'Authorization' => "Bearer #{yelpAPIKey}"  })

    result = JSON.parse(response.body)

    render json: result
  end

  def update
    user = User.find(params[:id])
    user.update(user_params)

    render json: user
  end

  private
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :username, restaurants_attributes:[[ :name, :address, :food_type, :price_range, :rating]])
  end
end
