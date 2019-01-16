defmodule HypeWeb.Router do
  use HypeWeb, :router

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
    post "/items/", ItemController, :create
  end
end
