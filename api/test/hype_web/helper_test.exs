defmodule HypeWeb.HelperTest do
  use ExUnit.Case, async: true

  alias HypeWeb.Helper

  describe "elixirify" do
    test "properly converts a map from camel case to snake case" do
      map = %{
        "superMap" => %{
          "subMapField" => "subMapValue",
          "another_map_field" => "another_map_value"
        }
      }

      expected = %{
        "super_map" => %{
          "sub_map_field" => "subMapValue",
          "another_map_field" => "another_map_value"
        }
      }

      assert Helper.elixirify(map) == expected
    end
  end
end