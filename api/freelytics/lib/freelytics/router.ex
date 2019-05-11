defmodule Freelytics.Router do
  use Plug.Router

  plug(:match)
  plug(:dispatch)
  plug(Plug.Parsers, parsers: [:urlencoded, :json], json_decoder: Jason)

  get "/get" do
    analytics = %Freelytics.Analytics{}
    Freelytics.Repo.insert(analytics)
    send_resp(conn, 200, "world")
  end

  post "/save" do
    # analytics = %Freelytics.Analytics{}
    # Freelytics.Repo.insert(analytics)
    {:ok, body, conn} = Plug.Conn.read_body(conn)
    IO.inspect(body)
    send_resp(conn, 200, "world")
  end

  match _ do
    send_resp(conn, 404, "oops")
  end
end
