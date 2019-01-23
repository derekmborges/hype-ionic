defmodule HypeWeb.TransactionControllerTest do
  use HypeWeb.ConnCase

  alias Hype.Auth.Guardian
  alias Hype.Sales
  alias Hype.CommonTestData, as: TestData

  describe "create transaction" do
    setup :create_user

    test "adds transaction to database and returns result", %{conn: conn, user: user} do
      conn = conn
        |> Guardian.Plug.sign_in(user)
        |> post("/api/transactions", TestData.post_transaction)

      assert json_response(conn, 200)["ok"] == true
      assert json_response(conn, 200)["data"]["transaction"]["id"] != nil
      assert json_response(conn, 200)["data"]["transaction"]["userId"] == TestData.transaction.user_id
      assert json_response(conn, 200)["data"]["transaction"]["itemId"] == TestData.transaction.item_id
      assert json_response(conn, 200)["data"]["transaction"]["itemState"] == TestData.transaction.item_state
      assert json_response(conn, 200)["data"]["transaction"]["purchaseDate"] == Date.to_string(TestData.transaction.purchase_date)
      assert json_response(conn, 200)["data"]["transaction"]["purchaseAmount"] == Decimal.to_string(TestData.transaction.purchase_amount)
      assert json_response(conn, 200)["data"]["transaction"]["saleDate"] == Date.to_string(TestData.transaction.sale_date)
      assert json_response(conn, 200)["data"]["transaction"]["saleAmount"] == Decimal.to_string(TestData.transaction.sale_amount)

      id = json_response(conn, 200)["data"]["transaction"]["id"]

      assert id != nil

      transaction_from_database = Sales.get_transaction!(id)

      assert transaction_from_database.user_id == TestData.transaction.user_id
      assert transaction_from_database.item_id == TestData.transaction.item_id
      assert transaction_from_database.item_state == TestData.transaction.item_state
      assert transaction_from_database.purchase_date == TestData.transaction.purchase_date
      assert transaction_from_database.purchase_amount == TestData.transaction.purchase_amount
      assert transaction_from_database.sale_date == TestData.transaction.sale_date
      assert transaction_from_database.sale_amount == TestData.transaction.sale_amount
    end
  end

  def create_user(params) do
    user = TestData.create(:user)
    Map.put(params, :user, user)
  end

end