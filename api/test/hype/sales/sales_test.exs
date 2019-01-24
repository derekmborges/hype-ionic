defmodule Hype.SalesTest do
  use Hype.DataCase

  alias Hype.{Sales, Sales.Item, Sales.Transaction}
  alias Hype.CommonTestData, as: TestData

  @random_id 12345

  describe "item" do
    test "get_item returns proper error when item not found" do
      assert nil == Sales.get_item(@random_id)
    end

    test "get_item returns proper item when exists" do
      id = TestData.create(:item).id

      assert %Item{} = retrieved_item = Sales.get_item(id)

      assert retrieved_item.user_id == TestData.item.user_id
      assert retrieved_item.brand == TestData.item.brand
      assert retrieved_item.model == TestData.item.model
      assert retrieved_item.size == TestData.item.size
    end

    test "get_item! returns proper exception when item not found" do
      assert_raise Ecto.NoResultsError, fn ->
        Sales.get_item!(@random_id)
      end
    end

    test "get_item! returns proper item when exists" do
      id = TestData.create(:item).id

      assert %Item{} = retrieved_item = Sales.get_item!(id)

      assert retrieved_item.user_id == TestData.item.user_id
      assert retrieved_item.brand == TestData.item.brand
      assert retrieved_item.model == TestData.item.model
      assert retrieved_item.size == TestData.item.size
    end

    test "create_item can create an item in the database" do
      item = TestData.create(:item)

      assert %Item{} = item
      assert item.user_id == TestData.item.user_id
      assert item.brand == TestData.item.brand
      assert item.model == TestData.item.model
      assert item.size == TestData.item.size
    end

    test "create_item returns error when invalid data is given" do
      assert {:error, %Ecto.Changeset{}} = Sales.create_item(%{})
    end

    test "get_all_items_for_user returns all items with a given user's id" do
      user = TestData.create(:item)

      user_item1 = TestData.create(:item, %{user_id: user.id, brand: "item1"})
      user_item2 = TestData.create(:item, %{user_id: user.id, brand: "item2"})
      random_item = TestData.create(:item, %{user_id: 1, brand: "random_item"})

      items = Sales.get_all_items_for_user(user.id)

      assert length(items) == 2

      assert Enum.find(items, fn itm -> itm.brand == user_item1.brand end) == user_item1
      assert Enum.find(items, fn itm -> itm.brand == user_item2.brand end) == user_item2

      assert Enum.find(items, fn itm -> itm.brand == random_item.brand end) == nil
    end
  end

  describe "transaction" do
    test "can be created and retrieved from the database" do
      id = TestData.create(:transaction).id

      assert %Transaction{} = transaction = Sales.get_transaction(id)

      assert transaction.item_id == TestData.transaction.item_id
      assert transaction.user_id == TestData.transaction.user_id
      assert transaction.item_state == TestData.transaction.item_state
      assert transaction.purchase_date == TestData.transaction.purchase_date
      assert transaction.purchase_amount == TestData.transaction.purchase_amount
      assert transaction.sale_date == TestData.transaction.sale_date
      assert transaction.sale_amount == TestData.transaction.sale_amount
    end

    test "get_transaction returns proper error value when not found" do
      assert nil == Sales.get_transaction(@random_id)
    end

    test "get_transaction! returns proper error value when not found" do
      assert_raise Ecto.NoResultsError, fn ->
        Sales.get_transaction!(@random_id)
      end
    end
  end


end
