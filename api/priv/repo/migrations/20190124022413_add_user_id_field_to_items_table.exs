defmodule Hype.Repo.Migrations.AddUserIdFieldToItemsTable do
  use Ecto.Migration

  def change do
    alter table(:items) do
      add :user_id, :id
    end
  end
end
