defmodule Hype.Sales.Item do
  use Ecto.Schema
  import Ecto.Changeset

  schema "items" do
    field :brand, :string
    field :model, :string
    field :size,  :string

    timestamps()
  end

  @doc false
  def changeset(item, attrs) do
    item
    |> cast(attrs, [:brand, :model, :size])
    |> validate_required([:brand, :model, :size])
  end
end
