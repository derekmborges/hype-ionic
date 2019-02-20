defmodule HypeWeb.Router do
  use HypeWeb, :router

  # TODO:
  # Add user_id to items table
  # Add index routes to item_controller, and transaction_controller
  #   to return all items/transactions for that user
  # Add show routes to get one item/transaction
  #   - authenticate to make sure the this is that user's item

  pipeline :api do
    plug :accepts, ["json"]

    plug HypeWeb.Plugs.BodyConversion
  end

  pipeline :auth do
    plug Hype.Auth.Pipeline
  end

  pipeline :ensure_auth do
    plug Guardian.Plug.EnsureAuthenticated
  end

  scope "/api", HypeWeb do
    pipe_through [:api, :auth]

    post "/users", UserController, :create

    post "/authentication/login", AuthController, :login
    post "/authentication/logout", AuthController, :logout
  end

  scope "/api", HypeWeb do
    pipe_through [:api, :auth, :ensure_auth]

    get "/users/", UserController, :current_user
    delete "/users/", UserController, :delete

    post "/items/", ItemController, :create
    get "/transactions/", TransactionController, :all
    post "/transactions/", TransactionController, :create
  end
end
