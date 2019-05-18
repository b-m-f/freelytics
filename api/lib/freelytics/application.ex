defmodule Freelytics.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    # List all child processes to be supervised
    children = [
      Freelytics.Repo,
      Plug.Cowboy.child_spec(
        scheme: :http,
        plug: Freelytics.Router,
        # TODO: This port should be configurable by the PORT environment variable
        options: [port: 8080]
      ),
      {Freelytics.Registry, name: Freelytics.Registry}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Freelytics.Supervisor]
    {:ok, pid} = Supervisor.start_link(children, opts)
  end
end
