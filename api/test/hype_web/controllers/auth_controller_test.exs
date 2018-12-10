defmodule HypeWeb.AuthControllerTest do
  use HypeWeb.ConnCase

  alias Hype.Accounts

  @user_params %{
    first_name: "test",
    last_name: "user",
    email: "test.user@example.com",
    password: "testpassword"
  }

  @login_params %{
    email: "test.user@example.com",
    password: "testpassword"
  }


  describe "login" do
    test "returns 'account does not exist' error if no email found", %{conn: conn} do
      conn =
        conn
        |> post("/api/authentication/login", %{"user" => @login_params})

      assert json_response(conn, 200)["ok"] == false
      assert json_response(conn, 200)["error"] == "Account not found"
    end

    test "returns 'Incorrect email or password' when password is incorrect", %{conn: conn} do
      insert(:user)

      incorrect_login_params = Map.put(@login_params, :password, "wrongpassword")

      conn =
        conn
        |> post("/api/authentication/login", %{"user" => incorrect_login_params})

      assert json_response(conn, 200)["ok"] == false
      assert json_response(conn, 200)["error"] == "Incorrect email or password"
    end

    test "correctly authenticates and logs in user", %{conn: conn} do
      user = insert(:user)

      conn =
        conn
        |> post("/api/authentication/login", %{"user" => @login_params})

      assert json_response(conn, 200)["ok"] == true
      assert json_response(conn, 200)["data"]["token"] |> String.length() > 0

      assert Guardian.Plug.current_resource(conn).id == user.id
    end
  end

  defp insert(:user) do
    {:ok, user} = Accounts.create_user(@user_params)
    user
  end
end
