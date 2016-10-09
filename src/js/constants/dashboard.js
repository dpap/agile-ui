const dashboad = {
  id: 1,
  title: 'New dashboard',
  tags: [],
  style: 'dark',
  timezone: 'browser',
  editable: true,
  hideControls: false,
  sharedCrosshair: false,
  rows:
   [ { collapse: false,
       editable: true,
       height: '250px',
       panels: [Object],
       title: 'Row' } ],
  time: { from: 'now-15m', to: 'now' },
  timepicker:
   { refresh_intervals: [ '5s', '10s', '30s', '1m', '5m', '15m', '30m', '1h', '2h', '1d' ],
     time_options: [ '5m', '15m', '1h', '6h', '12h', '24h', '2d', '7d', '30d' ] },
  templating: { list: [] },
  annotations: { list: [] },
  schemaVersion: 12,
  version: 3,
  links: [],
  gnetId: null 
}
