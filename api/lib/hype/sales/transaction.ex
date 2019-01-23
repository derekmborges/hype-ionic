defmodule Hype.Sales.Transaction do
  use Ecto.Schema
  import Ecto.Changeset

  schema "transactions" do
    field :user_id, :id
    field :item_id, :id
    field :item_state, :string
    field :purchase_date, :date
    field :purchase_amount, :decimal
    field :sale_date, :date
    field :sale_amount, :decimal

    timestamps()
  end

  def changeset(transaction, attrs) do
    transaction
    |> cast(attrs, [:user_id,
                    :item_id,
                    :item_state,
                    :purchase_date,
                    :purchase_amount,
                    :sale_date,
                    :sale_amount])
    |> validate_required([:user_id, :item_id, :item_state])
    |> validate_inclusion(:item_state, ["sold", "in_inventory"])
  end
end