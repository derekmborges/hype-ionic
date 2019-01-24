defmodule Hype.Sales.Item do
  use Ecto.Schema
  import Ecto.Changeset

  schema "items" do
    field :user_id, :id
    field :brand, :string
    field :model, :string
    field :size,  :string

    timestamps()
  end

  @doc false
  def changeset(item, attrs) do
    item
    |> cast(attrs, [:user_id, :brand, :model, :size])
    |> validate_required([:user_id, :brand, :model, :size])
  end
end
