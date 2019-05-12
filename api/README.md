# Freelytics

This is the API layer for freelytics. It is written with [elixir](https://elixir-lang.org), levering [ecto](https://hexdocs.pm/ecto/Ecto.html) and [plug](https://hexdocs.pm/plug/).


## Running
Run this via the dockerfile. 
It needs 1 environment variables set to function properly:
- `POSTGRES_URL`: A valid postgres URL in the [ecto format](https://hexdocs.pm/ecto/Ecto.Repo.html#module-urls)


### Migrating the database
On first run you might want to migrate the database.
To do this run the container with the command `/app/bin/freelytics migrate`.


### Building the docker image

To build the docker image, 1 environment variables are required:
- `COOKIE`: A string, that will server as the cookie to identify the running Erlang VM
- `ALLOWED_URL`: The URL from which get request should be permitted




