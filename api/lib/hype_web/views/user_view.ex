defmodule HypeWeb.UserView do
  use HypeWeb, :view

  alias HypeWeb.UserView

  def render("show.json", %{user: user}) do
    %{
      ok: true,
      data: %{
        user: render_one(user, UserView, "user.json")
      }
    }
  end

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password
    }
  end
end
