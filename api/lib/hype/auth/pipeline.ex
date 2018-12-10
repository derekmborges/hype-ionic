defmodule Hype.Auth.Pipeline do
  use Guardian.Plug.Pipeline,
    otp_app: :hype,
    error_handler: Hype.Auth.ErrorHandler,
    module: Hype.Auth.Guardian

  plug Guardian.Plug.VerifySession, claims: %{"typ" => "access"}

  plug Guardian.Plug.VerifyHeader, claims: %{"typ" => "access"}

  plug Guardian.Plug.LoadResource, allow_blank: true
end
