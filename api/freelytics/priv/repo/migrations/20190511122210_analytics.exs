defmodule Freelytics.Repo.Migrations.Analytics do
  use Ecto.Migration

  def change do
    create table(:analytics) do
      add(:root, :string, size: 40, primary_key: true)
      add(:url, :text)
      add(:times_visited, :integer)
      add(:time_spent, :float)

      timestamps()
    end
  end
end
