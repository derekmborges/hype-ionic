defmodule Hype.Sales do
  @moduledoc """
  queries for items
  """

  import Ecto.Query, warn: false

  alias Hype.Repo
  alias Hype.Sales.{Item, Transaction}

  def get_item(id), do: Repo.get(Item, id)

  def get_item!(id), do: Repo.get!(Item, id)

  def create_item(attrs \\ %{}) do
    %Item{}
    |> Item.changeset(attrs)
    |> Repo.insert()
  end

  def get_transaction(id), do: Repo.get(Transaction, id)

  def get_transaction!(id), do: Repo.get!(Transaction, id)

  def create_transaction(attrs \\ %{}) do
    %Transaction{}
    |> Transaction.changeset(attrs)
    |> Repo.insert()
  end
end
