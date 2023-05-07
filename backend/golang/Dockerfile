FROM golang:1.20

WORKDIR /server

COPY . .

RUN go mod tidy
RUN go build -v -o ./build/webkepzes_api

CMD ./build/webkepzes_api