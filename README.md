# An XML to JSON API Parser

A basic proxy, which makes requests to an XML API, converts the response to JSON and returns it.

## Setup

#### 1. Configure the server, open up config.json
```
{
	"endpoint" : "http://thetvdb.com/",
	"port" : 8080
}
```

#### 2. Install dependencies and launch the server
```
$ npm install
$ node server
```

#### 3. Make a GET request to the newly launched server

## ToDo

* Pass any headers/form data with the request to the API
