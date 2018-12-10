defmodule Hype.Repo do
  use Ecto.Repo,
    otp_app: :hype,
    adapter: Ecto.Adapters.Postgres
end
