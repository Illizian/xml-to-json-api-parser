/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var inspect = require('eyes').inspector({maxLength: false});
var request = require('request');

var xml2js = require('xml2js'),
	parser = new xml2js.Parser();

/**
 * Config
 */
var config = require('./config');

/**
 * Express Init and Config
 */
var app = express();

app.set('port', process.env.PORT || config.port || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.errorHandler());


/**
 * Express Listen
 */
http.createServer(app).listen(app.get('port'), function(){

	console.log("Server listening on "+app.get('port') + " with the following config:");
	inspect(config);

});

/*
 * Records API Instructions
 */
app.get('*', function(req, res) {

	console.log('Processing request for: '+req.originalUrl);

	request(config.endpoint+req.originalUrl, function (error, response, body) {

		if (!error && response.statusCode == 200) {

			console.log('API Fetch Successful');

			try {

				parser.parseString(body, function (err, result) {

					if(!err) {

						console.log('XML Parsed Successful - Sending JSON to client');

						res.json(result);

					}

				});

			} catch(err) {

				console.log('XML Parsed Failed - Sending error to client');

				res.json({
					status: 'XML Parse Error',
					error: err
				});

			}

		} else {

			console.log('API Fetched Failed');

			res.json({
				status: 'API Fetch Error',
				code: response.statusCode,
				error: error
			});

		}

	});

});