Rails.application.routes.draw do
  get 'workspaces/index'
  get 'workspaces/show'
  get 'workspaces/create'
  get 'workspaces/update'
  get 'workspaces/delete'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  post 'api/test', to: 'application#test'

	namespace :api, defaults: { format: :json } do
		resources :users, only: [:create]
		resource :session, only: [:show, :create, :destroy]
	end
end
