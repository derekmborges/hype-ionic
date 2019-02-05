defmodule Hype.Pages.Login do
  use Hound.Helpers

  def email_input, do: find_element(:id, "login-email")

  def password_input, do: find_element(:id, "login-password")

  def submit_button, do: find_element(:id, "login-submit")
end
