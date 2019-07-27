
############################
# STEP 1 build frontend
############################
FROM node:12-alpine AS builder


# Install system dependencies
RUN apk update && apk add --no-cache ca-certificates tzdata

# Create user to run the app
RUN adduser -D -g '' appuser 

## optional, to use to change the backend API
## currently done in package.json
# arg apiurl
# ENV API_URL $apiurl


WORKDIR /app

COPY . .

# Fetch dependencies.
RUN npm install

# compile app
RUN npm run build

############################
# STEP 2 Run the server
############################

# expose 5000 on container
EXPOSE 80

# set app port
ENV NUXT_PORT=80

# start the app
CMD [ "npm", "start" ]
