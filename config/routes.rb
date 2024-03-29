Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  # get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  # post 'api/test', to: 'application#test'

  mount ActionCable.server => '/cable'

	namespace :api, defaults: { format: :json } do
		resources :users, only: [:create, :show]
		resources :workspaces, only: [:index ,:show ,:create ,:update ,:destroy]
		resources :workspace_user_subscriptions, only: [:index ,:show ,:create ,:update ,:destroy]
		resources :channels, only: [:create, :index, :show, :update]
		resources :direct_messages, only: [:create, :index, :show, :update]
		resources :messages, only: [:create, :index, :show, :update, :destroy]
    patch '/messages/:id/mark_read', :to => 'messages#mark_read'

		resource :session, only: [:show, :create, :destroy]
	end
end
