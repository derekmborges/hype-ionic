defmodule Hype.TransactionTest do
  use ExUnit.Case, async: true

  alias Hype.Sales.Transaction

  @transaction_params %{
    item_id: 1,
    user_id: 1,
    purchase_date: ~D[2019-01-01],
    purchase_amount: Decimal.new("111.11"),
    sale_date: ~D[2019-01-02],
    sale_amount: Decimal.new("150.45"),
    item_state: "sold"
  }

  describe "transaction changeset" do
    test "creates correct changeset for schema" do
      assert %Ecto.Changeset{} = changeset = Transaction.changeset(%Transaction{}, @transaction_params)

      assert changeset.valid?

      assert changeset.changes == @transaction_params
    end

    test "validates requirement for item_id and item_state" do
      params =
        @transaction_params
        |> Map.delete(:item_id)
        |> Map.delete(:item_state)

      assert %Ecto.Changeset{} = changeset = Transaction.changeset(%Transaction{}, params)

      assert not changeset.valid?

      assert {"can't be blank", _} = changeset.errors[:item_id]
      assert {"can't be blank", _} = changeset.errors[:item_state]
    end

    test "validates that item_state is valid choice" do
      assert %Ecto.Changeset{} = changeset = 
        Transaction.changeset(%Transaction{}, Map.put(@transaction_params, :item_state, "sold"))

      assert changeset.valid?

      assert %Ecto.Changeset{} = changeset = 
        Transaction.changeset(%Transaction{}, Map.put(@transaction_params, :item_state, "in_inventory"))

      assert changeset.valid?

      assert %Ecto.Changeset{} = changeset = 
        Transaction.changeset(%Transaction{}, Map.put(@transaction_params, :item_state, "something_else"))

      assert not changeset.valid?

      assert {"is invalid", _} = changeset.errors[:item_state]
    end
  end
end