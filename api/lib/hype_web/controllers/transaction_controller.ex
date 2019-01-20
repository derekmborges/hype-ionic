defmodule HypeWeb.TransactionController do
  use HypeWeb, :controller

  alias Hype.{Sales, Sales.Transaction}

  action_fallback(HypeWeb.FallbackController)

  def create(conn = %{body_params: transaction_params}, _) do
    with {:ok, %Transaction{} = transaction} <- Sales.create_transaction(transaction_params) do
      conn
      |> render("show.json", transaction: transaction)
    end
  end
end