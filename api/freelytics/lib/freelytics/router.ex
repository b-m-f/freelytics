defmodule Freelytics.Router do
  use Plug.Router
  require Logger

  plug(Plug.Parsers, parsers: [:json], json_decoder: Jason)
  plug(:match)
  plug(:dispatch)

  get "/get" do
    send_resp(conn, 200, "world")
  end

  post "/save" do
    {status, body} =
      case conn.body_params do
        %{"root" => root, "url" => url} -> {200, %{url: url, root: root}}
        _ -> {422, "fails"}
      end

    Logger.info("got a post request for analytics to be saved")
    Logger.info("#{inspect(body)}")

    # here we should just update directly in the database
    # without getting the value first and then counting up by 1
    # {analytics, err} = Freelytics.Repo.get!(Freelytics.Analytics, root)
    # IO.inspect(analytics)
    # Freelytics.Repo.insert(analytics)
    send_resp(conn, 200, Jason.encode!(body))
  end

  match _ do
    send_resp(conn, 404, "oops")
  end
end
