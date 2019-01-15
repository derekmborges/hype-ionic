defmodule HypeWeb.BodyConversion do
  alias HypeWeb.Helper

  def init(opts), do: opts

  def call(conn, _opts) do
    IO.puts "BodyConversion call method"
    if Map.has_key?(conn, :body_params) do
      Map.update!(conn, :body_params, fn body ->
        Helper.elixirify(body)
      end)
    else
      conn
    end
  end
end
