defmodule Hype.SalesTest do
  use Hype.DataCase

  alias Hype.{Sales, Sales.Item, Sales.Transaction}

  @random_id 12345

  describe "item" do
    @item_params %{
      brand: "Nike",
      model: "Air VaporMax Flyknit 2",
      size: "12"
    }

    test "get_item returns proper error when item not found" do
      assert nil == Sales.get_item(@random_id)
    end

    test "get_item returns proper item when exists" do
      id = insert(:item).id

      assert %Item{} = retrieved_item = Sales.get_item(id)

      assert retrieved_item.brand == @item_params.brand
      assert retrieved_item.model == @item_params.model
      assert retrieved_item.size == @item_params.size
    end
    
    test "get_item! returns proper exception when item not found" do
      assert_raise Ecto.NoResultsError, fn ->
        Sales.get_item!(@random_id)
      end
    end

    test "get_item! returns proper item when exists" do
      id = insert(:item).id

      assert %Item{} = retrieved_item = Sales.get_item!(id)

      assert retrieved_item.brand == @item_params.brand
      assert retrieved_item.model == @item_params.model
      assert retrieved_item.size == @item_params.size
    end

    test "create_item can create an item in the database" do
      item = insert(:item)

      assert %Item{} = item
      assert item.brand == @item_params.brand
      assert item.model == @item_params.model
      assert item.size == @item_params.size
    end

    test "create_item returns error when invalid data is given" do
      assert {:error, %Ecto.Changeset{}} = Sales.create_item(%{})
    end

    defp insert(:item) do
      {:ok, item} = Sales.create_item(@item_params)
      item
    end
  end

  describe "transaction" do
    @transaction_params %{
      item_id: 1,
      item_state: "sold",
      purchase_date: ~D[2019-01-01],
      purchase_amount: Decimal.new("111.11"),
      sale_date: ~D[2019-01-02],
      sale_amount: Decimal.new("150.45")
    }

    test "can be created and retrieved from the database" do
      id = insert(:transaction).id

      assert %Transaction{} = transaction = Sales.get_transaction(id)

      assert transaction.item_id == @transaction_params.item_id
      assert transaction.item_state == @transaction_params.item_state
      assert transaction.purchase_date == @transaction_params.purchase_date
      assert transaction.purchase_amount == @transaction_params.purchase_amount
      assert transaction.sale_date == @transaction_params.sale_date
      assert transaction.sale_amount == @transaction_params.sale_amount
    end

    test "get_transaction returns proper error value when not found" do
      assert nil == Sales.get_transaction(@random_id)
    end

    test "get_transaction! returns proper error value when not found" do
      assert_raise Ecto.NoResultsError, fn ->
        Sales.get_transaction!(@random_id)
      end
    end

    defp insert(:transaction) do
      {:ok, transaction} = Sales.create_transaction(@transaction_params)
      transaction
    end
  end


end
