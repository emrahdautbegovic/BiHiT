Rails.application.routes.draw do
  
  resources :answers
  resources :questions
  resources :likes
  resources :comments
  resources :posts
  resources :admin_answers
  resources :admin_questions
  resources :admin_likes
  resources :admin_comments
  resources :admin_posts
  resources :categories
  resources :suggestions
  resources :subcategories
  resources :user_suggestions
  
  mount_devise_token_auth_for 'User', at: 'auth'

  mount_devise_token_auth_for 'Admin', at: 'admin_auth'
  
  get '/users', to: 'users#index'
  get '/adminusers/:id', to: 'users#show'
  get '/userusers', to: 'user_users#index'
  get '/users/:id', to: 'user_users#show'
  get '/usercategories', to: 'user_categories#index'
  get '/usersubcategories', to: 'user_subcategories#index'
  get '/usersubcategories/:id', to: 'user_subcategories#show'
end
