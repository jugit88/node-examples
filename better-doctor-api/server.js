var express = require('express')
var requestData = require('./requestData')
var elasticsearch = require('elasticsearch')
var https = require('https')
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
})
var app = express()
var PORT = process.env.PORT || 3000

// Get all data from database

app.get('/api/v1/doctors/search?:name',function(req,res, next) {
  var name = req.query.name
  console.log(name)
  if(name) {
    next()
  }
  else {
    client.search({
      type: 'doctors'
    }).then(function(resp) {
      var hits = resp.hits.hits
      if(hits.length == 0) {
        res.status(200).end('Nothing in Database')
      }
      else {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).send(hits)
      }
    }, function(err) {
      // Name not found in ElasticSearch
      console.log(err)
      })
  }
})
app.get('/api/v1/doctors/search?:name',function(req,res, next) {
  var name = req.query.name
  if(!name) {
    res.status(400).end('Bad Request')
  }
  var newName = name.replace(' ','-')
  client.search({
    index: newName
  }).then(function(resp) {
    var hits = resp.hits.hits
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(hits)
  }, function(err) {
    // Name not found in ElasticSearch
    console.log({'Cache miss': err})
    // Move to next middleware function
    next()
  })
})
// Make request from betterdoctor API
app.get('/api/v1/doctors/search?:name', function(req, res) {
  var name = req.query.name
  // name = name.trim()
  var apikey = KEY
  var encodedPath = encodeURI('/2016-03-01/doctors?name='+name+'&limit=100&user_key='+apikey)
  const options = {
    hostname: 'api.betterdoctor.com',
    path: encodedPath
  }
  const request = https.request(options, (response) => {
    console.log(`STATUS: ${res.statusCode}`)
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    var str = ''
    // Request data using streams
    response.on('data', (chunk) =>{
      str += chunk
    })
    response.on('end', () => {
      console.log('No more data in response.');
      var payload = JSON.parse(str)
      // populate ElasticSearch database
      requestData.populate(name, {payload})
      // send header and body to client
      res.setHeader('Content-Type', 'application/json')
      res.status(200).send(str)
    })
  })
  request.on('error', (e) => {
    console.error(`problem with request: ${e.message}`)
    res.status(500).end('Could not complete request.')
  });
  request.end()
})

// Catch all for routes not supported
app.use(function(req, res){
  console.log({'status': 404})
  res.send(404)
})
// Instaniate server listening on localhost:PORT
app.listen(PORT, function () {
  console.log('Listening on port ' + PORT)
})
