/* eslint-disable */
var agileApi, wsApi, agileGraph, agileData, base, staticDir

if (process.env.NODE_ENV === 'production') {
  agileApi = 'http://agile-core:8080'
  agileGraph = 'http://agile-graph:3000'
  agileData = 'http://agile-data:8086'
  staticDir = '/public'
} else {
  base = '217.77.95.110'
  agileApi = 'http://' + base + ':8080'
  agileGraph = 'http://' + base + ':3000'
  wsApi = 'ws://' + base + ':8080/ws'
  staticDir = '/src'
}

module.exports = {
  agileApi: agileApi,
  agileGraph: agileGraph,
  agileData: agileData,
  staticDir: staticDir,
  wsApi: wsApi,
  serverPort: 1337
}
