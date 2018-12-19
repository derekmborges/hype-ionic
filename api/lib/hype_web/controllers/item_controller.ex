defmodule HypeWeb.ItemController do
  use HypeWeb, :controller

  alias Hype.{Sales, Sales.Item}

  action_fallback(HypeWeb.FallbackController)

  def create(conn, %{"item" => item_params}) do
    with {:ok, %Item{} = item} <- Sales.create_item(item_params) do
      conn
      |> render("show.json", item: item)
    end
  end
end
