defmodule Hype.CommonTestData do

  alias Hype.{Sales, Sales.Item, Sales.Transaction, Accounts, Accounts.User}

  @user_params %{
    first_name: "test",
    last_name: "user",
    email: "test.user@example.com",
    password: "test_password"
  }

  @item_params %{
    user_id: 1,
    brand: "Nike",
    model: "Air Jordan 3 Retro",
    size: "12"
  }

  @post_item_params %{
    userId: 1,
    brand: "Nike",
    model: "Air Jordan 3 Retro",
    size: "12"
  }

  @transaction_params %{
    user_id: 1,
    item_id: 1,
    purchase_date: ~D[2019-01-01],
    purchase_amount: Decimal.new("111.11"),
    sale_date: ~D[2019-01-02],
    sale_amount: Decimal.new("150.45"),
    item_state: "sold"
  }

  @post_transaction_params %{
    userId: 1,
    itemId: 1,
    purchaseDate: "2019-01-01",
    purchaseAmount: 111.11,
    saleDate: "2019-01-02",
    saleAmount: 150.45,
    itemState: "sold"
  }

  def user, do: @user_params

  def item, do: @item_params

  def post_item, do: @post_item_params

  def transaction, do: @transaction_params

  def post_transaction, do: @post_transaction_params

  def create(:user), do: create(:user, @user_params)

  def create(:item), do: create(:item, @item_params)

  def create(:transaction), do: create(:transaction, @transaction_params)

  def create(:user, attrs) do
    user = Map.merge(@user_params, attrs)
    {:ok, %User{} = user} = Accounts.create_user(user)
    user
  end

  def create(:item, attrs) do
    item = Map.merge(@item_params, attrs)
    {:ok, %Item{} = item} = Sales.create_item(item)
    item
  end

  def create(:transaction, attrs) do
    transaction = Map.merge(@transaction_params, attrs)
    {:ok, %Transaction{} = transaction} = Sales.create_transaction(transaction)
    transaction
  end
end