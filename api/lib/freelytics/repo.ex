defmodule Freelytics.Repo do
  use Ecto.Repo,
    otp_app: :freelytics,
    adapter: Ecto.Adapters.Postgres
  def init(_type, config) do
    {:ok, Keyword.put(config, :url, System.get_env("POSTGRES_URL"))}
  end
end
