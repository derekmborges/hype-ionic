defmodule HypeWeb.Helper do
  def elixirify(map) do
    map
    |> Enum.map(fn {k, v} ->
      value = if is_map(v) do
        elixirify(v)
      else
        v
      end

      {camel_case_to_snake_case(k), value}
    end)
    |> Enum.into(%{})
  end

  def camel_case_to_snake_case(str) do
    str1 = Regex.replace(~r/(.)([A-Z][a-z]+)/, str, "\\1_\\2")

    String.downcase(Regex.replace(~r/([a-z0-9])([A-Z])/, str1, "\\1_\\2"))
  end
end
