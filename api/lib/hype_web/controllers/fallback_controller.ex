defmodule HypeWeb.FallbackController do
  @moduledoc """
  Controller to handle error cases including 401, 404, 403, and other errors
  """

  use HypeWeb, :controller

  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> render(HypeWeb.ChangesetView, "error.json", changeset: changeset)
  end

  def call(conn, {:error, :invalid_credentials}) do
    conn
    |> put_status(:unauthorized)
    |> render(HypeWeb.ErrorView, :"401")
  end

  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> render(HypeWeb.ErrorView, :"404")
  end

  def call(conn, nil) do
    conn
    |> put_status(:forbidden)
    |> render(HypeWeb.ErrorView, :"403")
  end
end
