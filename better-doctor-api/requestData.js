#!/usr/bin/env node
// const { URL } = require('url');
// process.env.UV_THREADPOOL_SIZE = 128;
var https = require('https')
var elasticsearch = require('elasticsearch')
var StringDecoder = require('string_decoder').StringDecoder;
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
})
exports.checkCache = function(name) {
  var newName = name.replace(' ','-')
  client.search({
    index: newName
    // q: 'match_all'
  }).then(function(resp) {
    var hits = resp.hits
    return hits
  }, function(err) {
    makeRequest(name)
    console.log({'Cache miss': err})
  })
}
function populate(name, data) {
  var newName = name.replace(' ','-')
  client.index({
    index: newName,
    id: '1',
    type: 'doctors',
    body: data
  },function(err,resp,status) {
      console.log(resp);
  });
}

function makeRequest(name) {
  var apikey = KEY
  var encodedPath = encodeURI('/2016-03-01/doctors?name='+name+'&limit=100&user_key='+apikey)
  const options = {
    hostname: 'api.betterdoctor.com',
    path: encodedPath
  }
  const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`)
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    var decoder = new StringDecoder('utf8')
    var str = ''
    res.on('data', (chunk) =>{
      var textChunk = decoder.write(chunk)
      str += chunk
    })
    res.on('end', () => {
      console.log('No more data in response.');
      // console.log(str)
      var json = JSON.parse(str)
      populate(name, {json})
      return json
    })
  })
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  req.end()
}
