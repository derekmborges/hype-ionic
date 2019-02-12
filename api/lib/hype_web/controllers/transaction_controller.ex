defmodule HypeWeb.TransactionController do
  use HypeWeb, :controller

  alias Hype.{Sales, Sales.Transaction}

  action_fallback(HypeWeb.FallbackController)

  def create(conn = %{body_params: transaction_params}, _) do
    current_user_id = Guardian.Plug.current_resource(conn).id

    updated_transaction_params = Map.put(transaction_params, "user_id", current_user_id)
    with {:ok, %Transaction{} = transaction} <- Sales.create_transaction(updated_transaction_params) do
      conn
      |> render("show.json", transaction: transaction)
    end
  end

  def all(conn, _) do
    current_user = Guardian.Plug.current_resource(conn)

    transactions = Sales.get_all_transactions_for_user(current_user.id)

    conn
    |> render("all.json", transactions: transactions)
  end
end
