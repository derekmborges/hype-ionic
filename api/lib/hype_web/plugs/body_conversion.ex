defmodule HypeWeb.Plugs.BodyConversion do
  alias HypeWeb.Helper

  def init(opts), do: opts

  def call(conn, _opts) do
    if Map.has_key?(conn, :body_params) do
      Map.update!(conn, :body_params, fn body ->
        Helper.elixirify(body)
      end)
    else
      conn
    end
  end
end
