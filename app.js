/* eslint-disable */
(function() {
    'use strict';

    const chalk = require('chalk');
    const express = require('express');
    const compression = require('compression');
    const serveStatic = require('serve-static');
    const httpProxy = require('http-proxy');
    const apiProxy = httpProxy.createProxyServer();
    const baseAPI = 'http://localhost:8080'
    const dataServer = 'http://localhost:9000'
    const app = express();
    const ipAddress = process.env.DEVICE_IP || '0.0.0.0'
    const grafanaPort = process.env.GRAFANA_PORT || 3000
    const serverPort = process.env.AGILE_CLIENT_PORT || 1337;

    app.all("/api/*", function(req, res) {
      console.log('redirecting to API');
      apiProxy.web(req, res, {target: baseAPI});
    });

    app.all("/data/*", function(req, res) {
      console.log('redirecting to DataServer');
      apiProxy.web(req, res, {target: dataServer});
    });

    app.get("/resin/grafana", function(req, res) {
      res.status(200).send(ipAddress + ':' + grafanaPort + '/dashboard/db/');
    });

    app.use(compression());
    app.use(serveStatic(__dirname + '/public', {
        'index': ['index.html']
    }));

    app.listen(serverPort, function() {
      console.log(chalk.cyan('Agile Client listening on port '+ serverPort));
    });
})();
