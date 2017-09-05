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
  mount_devise_token_auth_for 'User', at: 'auth'

  mount_devise_token_auth_for 'Admin', at: 'admin_auth'
  
  get '/users', to: 'users#index'
  get '/userusers', to: 'user_users#index'
  get '/users/:id', to: 'user_users#show'
  get '/usercategories', to: 'user_categories#index'
  get '/usersubcategories', to: 'user_subcategories#index'
  get '/usersubcategories/:id', to: 'user_subcategories#show'
  get '/aanswers', to: 'admin_answers#index'
  get '/aquestions', to: 'admin_questions#index'
  get '/aposts', to: 'admin_posts#index'
  get '/acomments', to: 'admin_comments#index'
  delete '/aanswers/:id', to: 'admin_answers#destroy'
  delete '/aquestions/:id', to: 'admin_questions#destroy'
  delete '/aposts/:id', to: 'admin_posts#destroy'
  delete '/acomments/:id', to: 'admin_comments#destroy'

  as :admin do
    resources :categories
    resources :suggestions
    resources :subcategories
  end

  as :user do
    resources :user_suggestions
  end
end
