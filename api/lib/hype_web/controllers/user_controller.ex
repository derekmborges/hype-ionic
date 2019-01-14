defmodule HypeWeb.UserController do
  use HypeWeb, :controller

  alias Hype.{Accounts, Accounts.User}

  action_fallback(HypeWeb.FallbackController)

  def current_user(conn, _params) do
    user = Guardian.Plug.current_resource(conn)

    conn
    |> render("show.json", user: user)
  end

  def create(conn, %{
        "user" => %{
          "email" => email,
          "firstName" => first_name,
          "lastName" => last_name,
          "password" => password
        }
      }) do
    user_params = %{
      "email" => email,
      "first_name" => first_name,
      "last_name" => last_name,
      "password" => password
    }

    with {:ok, %User{} = user} <- Accounts.create_user(user_params) do
      conn
      |> render("show.json", user: user)
    end
  end
end
