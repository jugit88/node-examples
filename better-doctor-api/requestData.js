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
function checkCache(name) {
  client.search({
    index: name
  }).then(function(resp) {
    var hits = resp.hits
  }, function(err) {
    console.trace(err.message)
  })
}
// function createDocument(name, data) {
//   var myBody = { index: {_index: name, _type: 'doctor', _id: '1' } }, data
//   client.bulk({
//     index: name,
//     type: 'doctor',
//     body: myBody
//   })
// }
// client.indices.create({
//   index: 'charles-anderson'
// },function(err,resp,status) {
//   if(err) {
//     console.log(err);
//   }
//   else {
//     console.log("create",resp);
//   }
// });
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
var totalDoc = []

// function createDocument(name,data) {
  // var newName = name.replace(' ','-')
//   client.create({
//     index: newName,
//     type: 'doctor',
//     id: '1',
//     body: data
//   })
// }
var name = 'charles anderson'
var skip = 'skip=100&'
var apikey = KEY
var encodedPath = encodeURI('/2016-03-01/doctors?name='+name+'&limit=10&user_key='+apikey)
const options = {
  hostname: 'api.betterdoctor.com',
  // port: 80,
  path: encodedPath
  // method: 'GET',
  // headers: {
  //   'Content-Type': 'application/json'
  // }
}
const req = https.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`)
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  var decoder = new StringDecoder('utf8')
  var str = ''
  res.on('data', (chunk) =>{
    // console.log(`BODY: ${chunk}`)
    var textChunk = decoder.write(chunk)
    str += chunk
    // str = decoder.write(str)
    // var text = JSON.parse(textChunk)
    // console.log(text)
    // totalDoc.push(textChunk)
    // console.log(totalDoc.length)

  })
  res.on('end', () => {
    console.log('No more data in response.');
    // console.log(str)
    var json = JSON.parse(str)
    populate(name, {json})
  })
})
// populate(name, totalDoc)
req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});
req.end()
// console.log(totalDoc)
