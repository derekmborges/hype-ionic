defmodule HypeWeb.AuthView do
  use HypeWeb, :view

  def render("authenticated.json", %{token: token}) do
    %{
      ok: true,
      data: %{
        token: token
      }
    }
  end

  def render("authentication_failure.json", %{error: error}) do
    %{
      ok: false,
      error: error
    }
  end

  def render("logout.json", _params) do
    %{
      ok: true,
      data: %{
        message: "You have successfuly logged out"
      }
    }
  end
end
