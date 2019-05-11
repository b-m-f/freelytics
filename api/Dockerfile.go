############################
# STEP 1 build executable binary
############################
FROM golang:alpine AS builder


# Install dependencies
RUN apk update && apk add --no-cache ca-certificates git tzdata gcc

# Create appuser.
RUN adduser -D -g '' appuser

WORKDIR /go
COPY . .

# Fetch dependencies.

RUN go get -d -v

# Build the binary.
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o /go/bin/api

############################
# STEP 2 build a small image
############################
FROM scratch


WORKDIR /go

COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /go/bin/api /go/api
COPY --from=builder /usr/share/zoneinfo /usr/share/zoneinfo
 
USER appuser

EXPOSE 10920

ENTRYPOINT ["/go/api"]
