# Frontend
This is the code for the frontend client that will run as a web application build in ELM.
The goal is to run locally without dependency on an external server.

## Building
First install all dependencies with `npm install`. Node version **>=11** is needed.

## Option 1: Template variables

Edit the `global_variables.js` file in the `pages` folder to set the correct **URL** for your api.
You can now build the script with `npm run build`. The output html files will be in dist. These can be used directly to server with f.e. NGINX.

## Option 2: Environment variables

You can also build the script with `env API_URL=YOUR_API_IP npm run build`. The output html files will be in dist. These can be used directly to server with f.e. NGINX.
The `API_URL` has to be set explicitely. Otherwise it will default to `localhost:8080`. 


### What exactly are the build steps?
The main Idea here, is that the each page on the website is self contained, sharing only things like Header and Footer with each other through templates.
This is reflected in the `src` and `static` folders, where each directory corresponds to the page where the code will be at.

You can check out the `package.json` to fully see what is going on, here is an overview.
- Compile all Elm files into optimized JavaScript to `static` directory
- Compile all JavaScript to `static` directory
- Compile all the templates with `compile_templates.mjs` script.
- Build a Dockerfile with the generated output, using NGINX for routing.

### Tracking Script
All JavaScript code is being build by using [rollup](https://rollupjs.org/) and [babel](https://babeljs.io/).
This way we can neatly modularize our code and use the latest JavaScript versions.


### Dashboard
The Dashboard is written in ELM. Making it very easy to refactor and extend.

### HTML sites

All HTML sites are written with [handlebar](https://github.com/wycats/handlebars.js/) templates.
This allows modularity and sharing HTML snippets between different sites, that can use different technologies.


## Development
First install all necessary dependencies with `npm install`.
In addition you will need `entr`, `docker` and `docker-compose`. This should be easily installable with your package manager, f.e. `apt install entr docker docker-compose` on debian based Linux.
Then simply run `npm run dev` to start all the interactive Development environments.
Any code changes will immediately reflect on the websites.
Since the technologies between the sites are different, this will also start a simple HTTPServer that runs inside a docker container, so you can view everything in the browser at `http://localhost:9000`.
Make sure to also start the **Api**.

### Stopping the docker container
Just run `docker stop analyze_frontend_dev`.

### Default site layout
All the following sites will implement a default site layout, which includes a **Header** with navigation and a **Footer**. 
The content will the be passed into the middle of those.
These are defined in `pages/partials` and then included into the page templates.


### ELM
You can find the Code for the ELM pages in `src/$PAGENAME.elm`.
To just run the elm development environment, run `npm run dev:elm`.

### Tracking Script
The tracking-script and the page to generate it can be found at `src/trackingScript`.
To just run the tracking script development environment, run `npm run dev:trackingScript`.


### Testing

To run all tests, simply run `npm run test`.

### Tracking Script
Tests use the [jest](https://jestjs.io/) test runner and can be run with `npm run test:trackingScript`.

## Contributing
Please provide some useful testing for any changes you make. If you do not feel comfortable in writing tests or are not sure if they are great, just create a pull request with what you have, and I will be happy to offer some assistance :)

