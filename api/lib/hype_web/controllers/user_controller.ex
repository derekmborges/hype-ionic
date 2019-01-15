defmodule HypeWeb.UserController do
  use HypeWeb, :controller

  alias Hype.{Accounts, Accounts.User}
  alias HypeWeb.Helper

  action_fallback(HypeWeb.FallbackController)

  def current_user(conn, _params) do
    user = Guardian.Plug.current_resource(conn)

    conn
    |> render("show.json", user: user)
  end

  def create(conn, user_params) do
    with {:ok, %User{} = user} <- Accounts.create_user(Helper.elixirify(user_params)) do
      conn
      |> render("show.json", user: user)
    end
  end
end
