defmodule HypeWeb.UserController do
  use HypeWeb, :controller

  alias Hype.{Accounts, Accounts.User}

  action_fallback(HypeWeb.FallbackController)

  def current_user(conn, _params) do
    user = Guardian.Plug.current_resource(conn)

    conn
    |> render("show.json", user: user)
  end

  def create(conn = %{body_params: user_params}, _params) do
    with {:ok, %User{} = user} <- Accounts.create_user(user_params) do
      conn
      |> render("show.json", user: user)
    end
  end

  def delete(conn, _params) do
    user = Guardian.Plug.current_resource(conn)

    with {:ok, %User{} = user} <- Accounts.delete_user(user) do
      conn
      |> render("show.json", user: user)
    end
  end
end
