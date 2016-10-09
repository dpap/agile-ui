/* eslint-disable */
(function() {
    'use strict';

    const chalk = require('chalk');
    const express = require('express');
    const compression = require('compression');
    const serveStatic = require('serve-static');
    const httpProxy = require('http-proxy');
    const apiProxy = httpProxy.createProxyServer();
    // TODO don't hardcode ports
    const agileCore = 'http://217.77.95.110:8080';
    const agileGraph = 'http://agile-graph:9000';
    const agileCoreWS = 'ws://217.77.95.110:8080/ws';
    const app = express();
    const ipAddress = process.env.DEVICE_IP || '217.77.95.110';
    const grafanaPort = process.env.AGILE_GRAPH_PORT || 3000;
    const serverPort = process.env.AGILE_CLIENT_PORT || 8080;

    httpProxy.createServer({
      target: agileCoreWS,
      ws: true
    }).listen(8081);

    app.all("/api/*", function(req, res) {
      console.log('redirecting to API');
      apiProxy.web(req, res, {target: agileCore});
    });

    app.all("/graph/*", function(req, res) {
      console.log('redirecting to agileGraph');
      apiProxy.web(req, res, {target: agileGraph});
    });

    app.get("/resin/grafana", function(req, res) {
      res.status(200).send(ipAddress + ':' + grafanaPort + '/dashboard/db/');
    });

    // hack
    app.get("/ws", function(req, res) {
      apiProxy.web(req, res, {target: agileCoreWS });
    });

    app.use(compression());
    app.use(serveStatic(__dirname + '/public', {
        'index': ['index.html']
    }));

    app.listen(serverPort, function() {
      console.log(chalk.cyan('Agile Client listening on port '+ serverPort));
    });
})();
