defmodule Hype.Auth do
  @moduledoc """
  High level authentication function such as authenticate_user or check_password
  """

  alias Hype.Accounts
  alias Comeonin.Pbkdf2, as: Comeonin

  def authenticate_user(email, plain_text_password) do
    email
    |> Accounts.get_user_by_email()
    |> check_password(plain_text_password)
  end

  defp check_password(nil, _), do: {:error, "Account not found"}

  defp check_password(user, plain_text_password) do
    case Comeonin.checkpw(plain_text_password, user.password) do
      true -> {:ok, user}
      false -> {:error, "Incorrect email or password"}
    end
  end
end
