defmodule HoundTest do
  use ExUnit.Case
  use Hound.Helpers

  alias Hype.Accounts
  alias Hype.Pages.Login

  hound_session()

  @billy_bob %{
    first_name: "Billy",
    last_name: "Bob",
    email: "bb@test.com",
    password: "password"
  }

  setup do
    # Accounts.create_user(@billy_bob)
    :ok
  end

  test "the truth", meta do
    navigate_to("localhost:8100")

    # Process.sleep(1000)
    click(Login.email_input)
    # Process.sleep(1000)
    send_text(@billy_bob.email)

    # Process.sleep(1000)
    click(Login.password_input)
    # Process.sleep(1000)
    send_text(@billy_bob.password)

    # Process.sleep(1000)
    click(Login.submit_button)
    # Process.sleep(3000)

    assert String.contains?(inner_text({:css, ".hydrated"}), "Welcome to Hype")
  end
end
