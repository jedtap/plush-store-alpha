Rails.application.routes.draw do
  resources :subscribers
  resources :products
  resources :orders
  resources :buyers
  get 'home/index'

  root 'home#index'
  match '*path', to: 'home#index', via: :all
end
