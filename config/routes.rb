Rails.application.routes.draw do
  get 'home/index'

  root 'home#index'
  match '*path', to: 'home#index', via: :all
end
