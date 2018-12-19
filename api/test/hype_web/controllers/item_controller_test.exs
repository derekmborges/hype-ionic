defmodule HypeWeb.ItemControllerTest do
  use HypeWeb.ConnCase

  alias Hype.{Sales, Sales.Item, Accounts, Accounts.User, Auth.Guardian}

  @item_params %{
    brand: "Nike",
    model: "Air Jordan 3 Retro",
    size: "12"
  }

  @user_params %{
    first_name: "test",
    last_name: "user",
    email: "test.user@example.com",
    password: "test_password"
  }

  describe "create item" do
    setup :create_user

    test "adds item to database and returns result", %{conn: conn, user: user} do
      conn =
        conn
        |> Guardian.Plug.sign_in(user)
        |> post("/api/items", %{"item" => @item_params})

      assert json_response(conn, 200)["ok"] == true
      assert json_response(conn, 200)["data"]["item"]["brand"] == @item_params.brand
      assert json_response(conn, 200)["data"]["item"]["model"] == @item_params.model
      assert json_response(conn, 200)["data"]["item"]["size"] == @item_params.size

      id = json_response(conn, 200)["data"]["item"]["id"]

      assert id != nil

      item_from_database = Sales.get_item(id)

      assert item_from_database.brand == @item_params.brand
      assert item_from_database.model == @item_params.model
      assert item_from_database.size == @item_params.size
    end
  end

  defp create_user(params) do
    {:ok, %User{} = user} = Accounts.create_user(@user_params)
    Map.put(params, :user, user)
  end

end
