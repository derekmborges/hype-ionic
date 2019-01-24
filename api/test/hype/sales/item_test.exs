defmodule Hype.ItemTest do
  use ExUnit.Case, async: true

  alias Hype.Sales.Item

  describe "item changeset" do
    test "returns error if any fields are blank" do
      assert %Ecto.Changeset{} = changeset = Item.changeset(%Item{}, %{})

      assert {"can't be blank", _ } = changeset.errors[:user_id]
      assert {"can't be blank", _ } = changeset.errors[:brand]
      assert {"can't be blank", _ } = changeset.errors[:model]
      assert {"can't be blank", _ } = changeset.errors[:size]
    end
  end
end
