# Solve what?
Auto reload the app inside a docker container whenever I change a file.


## What is the setup?
Container is running the app. All source-code is linked into the container from the Host with a volume.

## What have I tried?
Setting the run task to `iex -S mix`. Unfortuntely not responsive in my *docker-compose* set up, which I need for the database.
Opened up epmd to connect to the node from host machine. Works fine, but unfortunately sending the recompile command with `Node.spawn`.
