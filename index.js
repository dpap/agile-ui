/* eslint-disable */
(function() {
    'use strict';
    const serverConfig = require('./config/server')

    const chalk = require('chalk');
    const express = require('express');
    const compression = require('compression');
    const serveStatic = require('serve-static');
    const httpProxy = require('http-proxy');
    const http = require( 'http' );
    const app = express();
    const apiProxy = httpProxy.createProxyServer({
      headers: {
      'Access-Control-Allow-Origin': '*'
      }
    });
    const server = http.createServer(app);
    const io = require('socket.io')(server);
    var W3CWebSocket = require('websocket').w3cwebsocket;

    // this proxies all websocket requests
    io.on('connection', (socket) => {
      var client = new W3CWebSocket(serverConfig.wsApi);

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

    if (process.env.NODE_ENV != 'production') {
      // we use express as a dev server instead of webpack because we have lots of proxying to do and we want dev expierence to be the same as prod
      const webpack = require('webpack');
      const webpackConfig = require('./config/webpack.config.dev.js');
      const webpackMiddleware = require("webpack-dev-middleware");
      const compiler = webpack(webpackConfig);

      // use hmr api to rebuild assets when /src files change
      app.use(require("webpack-dev-middleware")(compiler, {
          noInfo: true, publicPath: webpackConfig.output.publicPath
      }));

      // inject files and reload browser
      app.use(require("webpack-hot-middleware")(compiler));
    }


    app.all("/api/*", function(req, res) {
      console.log('redirecting to API');
      apiProxy.web(req, res, {target: serverConfig.agileApi});
    });

    app.all("/graph/*", function(req, res) {
      console.log('redirecting to agileGraph');
      apiProxy.web(req, res, {target: serverConfig.agileGraph});
    });

    app.use(compression());
    app.use(serveStatic(__dirname + serverConfig.staticDir, {
        'index': ['index.html']
    }));

    server.listen( serverConfig.serverPort, function () {
    	console.log( `Proxy server listening on port ` + serverConfig.serverPort);
    });
})();
