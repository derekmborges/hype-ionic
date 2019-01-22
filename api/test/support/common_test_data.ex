defmodule Hype.CommonTestData do

  alias Hype.{Sales, Sales.Item, Sales.Transaction, Accounts, Accounts.User}

  @user_params %{
    first_name: "test",
    last_name: "user",
    email: "test.user@example.com",
    password: "test_password"
  }

  @item_params %{
    brand: "Nike",
    model: "Air Jordan 3 Retro",
    size: "12"
  }

  @transaction_params %{
    item_id: 1,
    purchase_date: ~D[2019-01-01],
    purchase_amount: Decimal.new("111.11"),
    sale_date: ~D[2019-01-02],
    sale_amount: Decimal.new("150.45"),
    item_state: "sold"
  }

  @post_transaction_params %{
    itemId: 1,
    purchaseDate: "2019-01-01",
    purchaseAmount: 111.11,
    saleDate: "2019-01-02",
    saleAmount: 150.45,
    itemState: "sold"
  }

  def user, do: @user_params

  def item, do: @item_params

  def transaction, do: @transaction_params

  def post_transaction, do: @post_transaction_params

  def create(:user), do: create(:user, @user_params)

  def create(:item), do: create(:item, @item_params)

  def create(:transaction), do: create(:transaction, @transaction_params)

  def create(:user, attrs) do
    {:ok, %User{} = user} = Accounts.create_user(attrs)
    user
  end

  def create(:item, attrs) do
    {:ok, %Item{} = item} = Sales.create_item(attrs)
    item
  end

  def create(:transaction, attrs) do
    {:ok, %Transaction{} = transaction} = Sales.create_transaction(attrs)
  end
end