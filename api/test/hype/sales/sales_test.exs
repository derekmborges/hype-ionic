defmodule Hype.SalesTest do
  use Hype.DataCase

  alias Hype.{Sales, Sales.Item}

  @item_params %{
    brand: "Nike",
    model: "Air VaporMax Flyknit 2",
    size: "12"
  }

  @random_id 12345

  describe "get_item" do
    test "returns proper error when item not found" do
      assert nil == Sales.get_item(@random_id)
    end

    test "returns proper item when exists" do
      id = insert_item().id

      assert %Item{} = retrieved_item = Sales.get_item(id)

      assert retrieved_item.brand == @item_params.brand
      assert retrieved_item.model == @item_params.model
      assert retrieved_item.size == @item_params.size
    end
  end

  describe "get_item!" do
    test "returns proper exception when item not found" do
      assert_raise Ecto.NoResultsError, fn ->
        Sales.get_item!(@random_id)
      end
    end

    test "returns proper item when exists" do
      id = insert_item().id

      assert %Item{} = retrieved_item = Sales.get_item!(id)

      assert retrieved_item.brand == @item_params.brand
      assert retrieved_item.model == @item_params.model
      assert retrieved_item.size == @item_params.size
    end
  end

  describe "create_item" do
    test "can create an item in the database" do
      item = insert_item()

      assert %Item{} = item
      assert item.brand == @item_params.brand
      assert item.model == @item_params.model
      assert item.size == @item_params.size
    end

    test "returns error when invalid data is given" do
      assert {:error, %Ecto.Changeset{}} = Sales.create_item(%{})
    end
  end

  defp insert_item() do
    {:ok, item} = Sales.create_item(@item_params)
    item
  end
end
