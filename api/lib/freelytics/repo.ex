defmodule Freelytics.Repo do
  use Ecto.Repo,
    otp_app: :freelytics,
    adapter: Ecto.Adapters.Postgres
end
