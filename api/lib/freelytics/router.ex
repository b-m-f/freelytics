defmodule Freelytics.Router do
  use Plug.Router
  require Logger
  require Ecto.Query

  plug(Plug.Parsers, parsers: [:json], json_decoder: Jason)
  plug(:match)
  plug(:dispatch)

  options "/get/:root" do
    headers = [
      {"Access-Control-Allow-Origin", System.get_env("ALLOWED_URL")},
      {"Access-Control-Allow-Methods", "OPTIONS"}
    ]

    conn.merge_resp_headers(conn, headers)
  end

  get "/get/:root" do
    ## if root has http:// https:// it should be removed
    query =
      Ecto.Query.from(a in Freelytics.Analytics,
        where: a.root == ^root,
        select: %{times_visited: a.times_visited, url: a.url}
      )

    entries = Freelytics.Repo.all(query)

    headers = [
      {"Access-Control-Allow-Origin", System.get_env("ALLOWED_URL")},
      {"Access-Control-Allow-Methods", "OPTIONS"}
    ]

    conn.merge_resp_headers(conn, headers)
    send_resp(conn, 200, Jason.encode!(entries))
  end

  options "/save" do
    headers = [
      {"Access-Control-Allow-Origin", "*"},
      {"Access-Control-Allow-Methods", "OPTIONS"},
      {"Access-Control-Allow-Headers", "Content-Type"}
    ]

    conn.merge_resp_headers(conn, headers)
  end

  post "/save" do
    {status, body} =
      case conn.body_params do
        %{"root" => root, "url" => url} -> {200, {root, url}}
        _ -> {400, "fails"}
      end

    if status == 400 do
      send_resp(conn, 400, "Wrong arguments.")
    end

    {root, url} = body

    # here we should just update directly in the database
    # without getting the value first and then counting up by 1
    result =
      case Freelytics.Repo.get_by(Freelytics.Analytics, root: root) do
        # Post not found, we build one
        nil ->
          insert_analytics(%Freelytics.Analytics{root: root, url: url, times_visited: 1})

        analytics ->
          update_analytics(analytics)
      end

    case result do
      {:ok, struct} ->
        Logger.info("Updated #{inspect(struct)}")

        headers = [
          {"Access-Control-Allow-Origin", "*"},
          {"Access-Control-Allow-Methods", "POST"},
          {"Access-Control-Allow-Headers", "Content-Type"}
        ]

        conn.merge_resp_headers(conn, headers)
        send_resp(conn, 200, "")

      {:error, changeset} ->
        Logger.info("Update failed for #{inspect(changeset)}")
        send_resp(conn, 400, "Failed.")
    end
  end

  match _ do
    send_resp(conn, 404, "oops")
  end

  defp insert_analytics(analytics) do
    Freelytics.Analytics.changeset(analytics, %{times_visited: analytics.times_visited + 1})
    |> Freelytics.Repo.insert()
  end

  defp update_analytics(analytics) do
    Freelytics.Analytics.changeset(analytics, %{times_visited: analytics.times_visited + 1})
    |> Freelytics.Repo.update()
  end
end
