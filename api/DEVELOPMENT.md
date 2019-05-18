# Development setup for the api
run DB `docker run -e POSTGRES_PASSWORD="hello" -e POSTGRES_USER=test -p 5432:5432 postgres:alpine`
migrate db `POSTGRES_URL=ecto://test:hello@localhost:5432/freelytics mix do ecto.drop, ecto.create, ecto.migrate`

connect to DB `env PGPASSWORD=test psql -h localhost -p 5432 -U postgres`

run iex `ALLOWED_URL="*" POSTGRES_URL=ecto://test:hello@localhost:5432/freelytics iex -S mix`
