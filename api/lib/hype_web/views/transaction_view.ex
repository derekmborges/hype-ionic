defmodule HypeWeb.TransactionView do
  use HypeWeb, :view

  alias HypeWeb.TransactionView

  def render("show.json", %{transaction: transaction}) do
    %{
      ok: true,
      data: %{
        transaction: render_one(transaction, TransactionView, "transaction.json")
      }
    }
  end

  def render("all.json", %{transactions: transactions}) do
    %{
      ok: true,
      data: render_many(transactions, TransactionView, "transaction.json")
    }
  end

  def render("transaction.json", %{transaction: transaction}) do
    %{
      id: transaction.id,
      userId: transaction.user_id,
      itemId: transaction.item_id,
      itemState: transaction.item_state,
      purchaseDate: transaction.purchase_date,
      purchaseAmount: transaction.purchase_amount,
      saleDate: transaction.sale_date,
      saleAmount: transaction.sale_amount
    }
  end
end
