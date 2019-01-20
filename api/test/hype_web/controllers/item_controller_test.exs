defmodule HypeWeb.ItemControllerTest do
  use HypeWeb.ConnCase

  alias Hype.{Sales, Auth.Guardian}
  alias Hype.CommonTestData, as: TestData

  describe "create item" do
    setup :create_user

    test "adds item to database and returns result", %{conn: conn, user: user} do
      conn =
        conn
        |> Guardian.Plug.sign_in(user)
        |> post("/api/items", %{"item" => TestData.item})

      assert json_response(conn, 200)["ok"] == true
      assert json_response(conn, 200)["data"]["item"]["brand"] == TestData.item.brand
      assert json_response(conn, 200)["data"]["item"]["model"] == TestData.item.model
      assert json_response(conn, 200)["data"]["item"]["size"] == TestData.item.size

      id = json_response(conn, 200)["data"]["item"]["id"]

      assert id != nil

      item_from_database = Sales.get_item(id)

      assert item_from_database.brand == TestData.item.brand
      assert item_from_database.model == TestData.item.model
      assert item_from_database.size == TestData.item.size
    end
  end

  defp create_user(params) do
    user = TestData.create(:user)
    Map.put(params, :user, user)
  end

end
