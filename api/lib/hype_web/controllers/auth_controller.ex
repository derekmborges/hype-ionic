defmodule HypeWeb.AuthController do
  use HypeWeb, :controller

  alias Hype.{Auth, Auth.Guardian}

  action_fallback(HypeWeb.FallbackController)

  def login(conn = %{body_params: %{"email" => email, "password" => password}}, _param) do
    Auth.authenticate_user(email, password)
    |> login_reply(conn)
  end

  def logout(conn, _params) do
    conn
    |> Guardian.Plug.sign_out()
    |> render("logout.json")
  end

  defp login_reply({:error, error}, conn) do
    conn
    |> render("authentication_failure.json", error: error)
  end

  defp login_reply({:ok, user}, conn) do
    authenticated_conn =
      conn
      |> Guardian.Plug.sign_in(user)

    token = Guardian.Plug.current_token(authenticated_conn)

    authenticated_conn
    |> render("authenticated.json", token: token)
  end
end
