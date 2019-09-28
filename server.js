const express = require('express')
const app = express(); 
const data = require('./src/scrapertest')
var port = process.env.PORT || 8095;

app.get('/', function(req, res) {
    console.log('Firing request for card.')
    data.dataRun(req.param('cardname'))
    res.send(req.param('cardname'))
});

app.listen(port, () =>
    console.log('server example listening on port ' + port)
)