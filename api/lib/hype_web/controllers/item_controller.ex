defmodule HypeWeb.ItemController do
  use HypeWeb, :controller

  alias Hype.{Sales, Sales.Item}

  action_fallback(HypeWeb.FallbackController)

  def create(conn = %{body_params: item_params}, _params) do
    with {:ok, %Item{} = item} <- Sales.create_item(item_params) do
      conn
      |> render("show.json", item: item)
    end
  end
end
