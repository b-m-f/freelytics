# Backend
This is the documentation for the backend, which will provide endpoints to save and retrieve analytics data.
All functions are commented in the code if they do anything complex.

## Choice of technology

Due to the complex ecosystem of Elixir and Erlang, which makes collaboration more difficult, I am reverting to Golang.
The main problem being automatic code reloading inside a provided container, and the knowledge of both erlang and elixir that is needed.
Golang is straight forward, and allows people to jump into the project easily. Lot of tooling exists, and for this simple application, all use-cases should easily be adressable.


## Development
Please install docker and docker-compose first.

Go into the `bin` directory and run `docker-compose up` to start the development environment.
The api will listen at **10920**. Any changes to files will immediately recompile and reload the API.

## Tests
### Integration tests
All integration tests can be found in the `integration_tests` folder. The packages can be used here, as they will be linked into this folder when the tests get executed in docker.

To start the Integration tests `docker-compose` is needed.
It will start a test database and run the tests whenever a test file is changed.
To start the tests simply run `./integration_tests.sh`.

When writing the tests the `psql` command is used. All postgres connection information is setup in `bin/integration_tests/docker-compose.yml`. This way it can easily connect to the test database, to make the tests more accurate, since they will actually run against postgres.
This way the library that is used for connection to postgres can easily be swapped out.

### Smoke tests
The tests script is in the `smoke_tests` directory.
To test the api throughly a few `curl` commands are used to hit the API from the outside, therefore acting as a normal client.

These tests will only run once and then terminate.
If they are successful it will be printed on the command line.

Again `docker-compose` is needed to build the environment. Simply run `./smoke_tests.sh`to run them.
In contrast to the **integration_tests** the **smoke_tests** will only be executed once.To run them again, stop the environment with `CTRL+c` and simply rerun the script.

## Building and starting the application
There are 2 options. To run a simple out of the box setup you can just run `./run.sh`. This again uses `docker-compose` to start up a database and build the production image of the Api.
You can also use the `bin/prod/Dockerfile` to use inside your own setup.
Make sure to set the following environment variables:
- `POSTGRES_URL` // so that the application knows, which database to connect to.
- `ALLOWED_URL` // the host that is allowed to query for data. CORS requirement
