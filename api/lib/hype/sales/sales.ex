defmodule Hype.Sales do
  @moduledoc """
  queries for items
  """

  import Ecto.Query, warn: false

  alias Hype.Repo
  alias Hype.Sales.Item

  def get_item(id), do: Repo.get(Item, id)

  def get_item!(id), do: Repo.get!(Item, id)

  def create_item(attrs \\ %{}) do
    %Item{}
    |> Item.changeset(attrs)
    |> Repo.insert()
  end
end
