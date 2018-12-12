defmodule Hype.Repo.Migrations.CreateItemsTable do
  use Ecto.Migration

  def change do
    create table(:items) do
      add :brand, :string
      add :model, :string
      add :size,  :string

      timestamps()
    end
  end
end
