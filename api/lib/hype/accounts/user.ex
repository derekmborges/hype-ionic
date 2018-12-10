defmodule Hype.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  alias Comeonin.Pbkdf2, as: Comeonin

  schema "users" do
    field :first_name, :string
    field :last_name, :string
    field :email, :string
    field :password, :string

    timestamps()
  end

  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :password, :first_name, :last_name])
    |> validate_required([:first_name, :last_name, :email, :password])
    |> unique_constraint(:email)
    |> put_password_hash()
  end

  defp put_password_hash(%Ecto.Changeset{valid?: true, changes: %{password: password}} = changeset) do
    change(changeset, password: Comeonin.hashpwsalt(password))
  end

  defp put_password_hash(changeset), do: changeset
end
