# Development setup for the api
run DB `docker run -e POSTGRES_PASSWORD="hello" -e POSTGRES_USER=test -p 5432:5432 postgres:alpine`
migrate db `POSTGRES_URL=ecto://test:hello@localhost:5432/freelytics mix do ecto.drop, ecto.create, ecto.migrate`

connect to DB `env PGPASSWORD=hello psql -h localhost -p 5432 -U test`

run iex `ALLOWED_URL="*" POSTGRES_URL=ecto://test:hello@localhost:5432/freelytics iex -S mix`


Sending a POST to the API `curl -X POST -H "Content-Type: application/json"  --data '{"root": "test", "url": "test"}' localhost:8080/save`
