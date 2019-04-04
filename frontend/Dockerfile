
############################
# STEP 1 build frontend
############################
FROM node:11-alpine AS builder


# Install system dependencies
RUN apk update && apk add --no-cache ca-certificates tzdata gcc

# Create user to run the app
RUN adduser -D -g '' nginx

ARG apiurl

ENV API_URL $apiurl


WORKDIR /app

COPY package.json elm.json /app/

# Fetch dependencies.
RUN npm install


COPY pages /app/pages/
COPY compiler /app/compiler/

# compile app
RUN npm run build


############################
# STEP 2 build a small image
############################

FROM nginx:alpine

COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /usr/share/zoneinfo /usr/share/zoneinfo
COPY --from=builder /app/dist/ /usr/share/nginx/html/

COPY docker-config/default.conf /etc/nginx/conf.d/default.conf

