/* eslint-disable */
(function() {
    'use strict';

    const chalk = require('chalk');
    const express = require('express');
    const compression = require('compression');
    const serveStatic = require('serve-static');
    const httpProxy = require('http-proxy');
    const http = require( 'http' );
    const app = express();
    const apiProxy = httpProxy.createProxyServer({ws:true});
    const server = http.createServer(app);
    // TODO don't hardcode ports
    const agileCore = 'http://agile-core:8080';
    const agileGraph = 'http://agile-graph:9000';
    const agileCoreWS = process.env.AGILE_CORE_WS || 'ws://agile-core:8080/ws';
    const ipAddress = process.env.DEVICE_IP || '10.0.0.4';
    const grafanaPort = process.env.AGILE_GRAPH_PORT || 3000;
    const serverPort = process.env.AGILE_CLIENT_PORT || 1337;
    const io = require('socket.io')(server);
    var W3CWebSocket = require('websocket').w3cwebsocket;

    // this proxies all websocket requests
    io.on('connection', (socket) => {
      var client = new W3CWebSocket(agileCoreWS);

      client.onopen = function() {
        socket.emit('agile_connect')
      };

      client.onmessage = function(e) {
          if (typeof e.data === 'string') {
            console.log("Received: '" + e.data + "'");
            socket.emit('agile_message', JSON.parse(e.data))
          }
      };

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });

    app.all("/api/*", function(req, res) {
      console.log('redirecting to API');
      apiProxy.web(req, res, {target: agileCore});
    });

    app.all("/graph/*", function(req, res) {
      console.log('redirecting to agileGraph');
      apiProxy.web(req, res, {target: agileGraph});
    });

    app.get("/resin/grafana", function(req, res) {
      console.log('grafana link request')
      res.status(200).send(ipAddress + ':' + grafanaPort + '/dashboard/db');
    });

    // app.use(compression());
    app.use(serveStatic(__dirname + '/public', {
        'index': ['index.html']
    }));

    server.listen( serverPort, function () {
    	console.log( `Proxy server listening on port ` + serverPort);
    });
})();
