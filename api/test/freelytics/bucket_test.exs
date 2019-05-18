defmodule Freelytics.BucketTest do
  use ExUnit.Case, async: true

  setup do
    {:ok, bucket} = Freelytics.Bucket.start_link([])
    %{bucket: bucket}
  end

  test "stores values by key", %{bucket: bucket} do
    assert Freelytics.Bucket.get(bucket, "milk") == nil

    Freelytics.Bucket.put(bucket, "milk", 3)
    assert Freelytics.Bucket.get(bucket, "milk") == 3
  end
end
