defmodule HypeWeb.ItemView do
  use HypeWeb, :view

  alias HypeWeb.ItemView

  def render("show.json", %{item: item}) do
    %{
      ok: true,
      data: %{
        item: render_one(item, ItemView, "item.json")
      }
    }
  end

  def render("item.json", %{item: item}) do
    %{
      id: item.id,
      brand: item.brand,
      model: item.model,
      size: item.size
    }
  end
end
