Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
       resources :users
       resources :restaurants
       post '/users/login', to: 'users#login'
       post '/users/search', to: 'users#search'
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

end
