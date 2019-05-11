defmodule Freelytics.Analytics do
  use Ecto.Schema

  schema "analytics" do
    field(:url, :string)
    field(:root, :string)
    field(:times_visited, :integer)
    field(:time_spent, :float)
  end
end
