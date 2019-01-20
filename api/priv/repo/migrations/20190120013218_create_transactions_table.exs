defmodule Hype.Repo.Migrations.CreateTransactionsTable do
  use Ecto.Migration

  def change do
    create table(:transactions) do
      add :item_id, :id
      add :item_state, :string
      add :purchase_date, :date
      add :purchase_amount, :decimal
      add :sale_date, :date
      add :sale_amount, :decimal

      timestamps()
    end
  end
end
