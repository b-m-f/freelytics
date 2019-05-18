defmodule Freelytics.RegistryTest do
  use ExUnit.Case, async: true

  setup do
    registry = start_supervised!(Freelytics.Registry)
    %{registry: registry}
  end

  test "spawns buckets", %{registry: registry} do
    assert Freelytics.Registry.lookup(registry, "shopping") == :error

    Freelytics.Registry.create(registry, "shopping")
    assert {:ok, bucket} = Freelytics.Registry.lookup(registry, "shopping")

    Freelytics.Bucket.put(bucket, "milk", 1)
    assert Freelytics.Bucket.get(bucket, "milk") == 1
  end

  test "removes buckets on exit", %{registry: registry} do
    Freelytics.Registry.create(registry, "shopping")
    {:ok, bucket} = Freelytics.Registry.lookup(registry, "shopping")
    Agent.stop(bucket)
    assert Freelytics.Registry.lookup(registry, "shopping") == :error
  end
end
