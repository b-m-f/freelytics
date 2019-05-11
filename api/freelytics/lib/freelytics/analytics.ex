defmodule Freelytics.Analytics do
  use Ecto.Schema

  def changeset(analytics, params \\ %{}) do
    analytics
    |> Ecto.Changeset.cast(params, [:root, :url, :times_visited])
    |> Ecto.Changeset.validate_required([:root, :url, :times_visited])
  end

  schema "analytics" do
    field(:url, :string)
    field(:root, :string)
    field(:times_visited, :integer)
    field(:time_spent, :float)
    timestamps()
  end
end
