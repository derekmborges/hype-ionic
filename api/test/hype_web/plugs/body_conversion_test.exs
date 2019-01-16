defmodule HypeWeb.BodyConversionTest do
  use ExUnit.Case, async: true

  describe "BodyConversion.call" do
    test "properly parses the body_params field without touching any other fields" do
      test_conn = %{
        method: "POST",
        other_field: %{
          "someField" => "someValue"
        },
        body_params: %{
          "someField" => %{
            "someSubField" => "someValue"
          }
        }
      }

      expected_conn = %{
        method: "POST",
        other_field: %{
          "someField" => "someValue"
        },
        body_params: %{
          "some_field" => %{
            "some_sub_field" => "someValue"
          }
        }
      }

      assert HypeWeb.Plugs.BodyConversion.call(test_conn, []) == expected_conn
    end
  end
end